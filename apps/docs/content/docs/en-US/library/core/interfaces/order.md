---
title: order
description: "The order interface: <, >, <=, >=, sorting, min and max, how cmp works and how to derive it."
---

```
pub interface order : eq {
    fn cmp(self, other: Self) -> int
}
```

`cmp` returns a negative number when `self` comes first, zero when equal, and a positive number when `self` comes after. `<`, `>`, `<=` and `>=` are defined from it, and so are `sort!`, `sorted`, `binarySearch`, `min` and `max`.

Integers, floats, `char` and strings are `order`; `bool` is not (```bool` cannot be ordered with `<` ``). Lists of ordered elements compare lexicographically. A `struct` you write is not ordered until you say so:

```pelago
struct ver { major: int, minor: int }

impl order for ver {
    fn cmp(self, other: ver) -> int = self.major != other.major ? self.major - other.major : self.minor - other.minor
}

@derive(order)
struct pair { a: int, b: int }

fn main() {
    var vs = [ver { major: 1, minor: 5 }, ver { major: 1, minor: 2 }, ver { major: 0, minor: 9 }]
    vs.sort!()
    print(vs[0].major, vs[2].minor, vs[0] < vs[1], math.max(vs[0], vs[2]).minor)
    print(pair { a: 1, b: 2 } < pair { a: 1, b: 3 })
}
```

```text
0 5 true 5
true
```

`@derive(order)` compares the fields in order, first to last.

## Edge cases

- Without it, `a < b` on a struct is the error ```a` cannot be ordered with `<`: it does not provide `order`; write `@derive(order)` on `a` or `impl order for a` ``.
- `cmp` must be consistent (`a.cmp(b)` and `b.cmp(a)` have opposite signs); `sort!` does not check.
- Strings compare by bytes, so `"Z" < "a"`.
- Floats: a NaN is unordered; see [`float`](../primitives/float.md).

## Related

[Interfaces](./index.md), [`list`](../collections/list.md) (`sort!`, `sortBy!`), [Math](../math.md) (`min`, `max`, `clamp`)
