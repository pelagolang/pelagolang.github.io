---
title: iter
description: "The lazy sequence iter<T>: where it comes from, every adapter and consumer, and how it is walked."
---

`iter<T>` is a sequence of values produced one at a time. It is what `xs.iter()`, `map`, `filter`, `s.chars()`, `s.split(sep)`, `s.lines()` and `m.keys()` return. Adapters such as `map` and `filter` build a new `iter` from an old one; a consumer such as `toList()`, `sum()` or a `for` loop runs it.

```pelago
fn main() {
    const xs = [3, 1, 4, 1, 5, 9, 2, 6]
    print(xs.iter().map(x ~> x * 2).filter(x ~> x > 6).toList())
    var total = 0
    for x of xs.iter().take(3) {
        total += x
    }
    print(total)
}
```

```text
[8, 10, 18, 12]
8
```

An `iter` is a single pass. A walk consumes it; call `iter()` on the source again to start over.

## Adapters

Each returns a new `iter`.

| Method | Result | Behaviour |
| --- | --- | --- |
| `map(f)` | `iter<U>` | Transform each element. |
| `filter(f)` | `iter<T>` | Keep the elements for which `f` holds. |
| `filterMap(f)` | `iter<U>` | `f` returns an option; `none` drops the element. |
| `flatMap(f)` | `iter<U>` | `f` returns an iterator; the results are joined. |
| `take(n)`, `skip(n)` | `iter<T>` | The first `n` elements, or all but the first `n`. A count beyond the length gives an empty result. |
| `takeWhile(f)`, `skipWhile(f)` | `iter<T>` | While `f` holds, then stop (or start). |
| `chain(other)` | `iter<T>` | This iterator, then `other`. |
| `zip(other)` | `iter<(T, U)>` | Pairs, ending with the shorter one. |
| `enumerate()` | `iter<(int, T)>` | Each element with its position, from 0. |
| `reversed()` | `iter<T>` | Back to front. |

```pelago
fn main() {
    const xs = [3, 1, 4, 1, 5, 9, 2, 6]
    print(xs.iter().take(3).toList(), xs.iter().skip(5).toList(), xs.iter().skip(99).toList())
    print(xs.iter().takeWhile(x ~> x < 5).toList(), xs.iter().skipWhile(x ~> x < 5).toList())
    print(xs.iter().take(2).enumerate().toList())
    print(xs.iter().take(3).zip(["a", "b"].iter()).toList())
    print([1, 2].iter().chain([3].iter()).toList(), [1, 2, 3].iter().reversed().toList())
    print([[1, 2], [3]].iter().flatMap(x ~> x.iter()).toList())
}
```

```text
[3, 1, 4] [9, 2, 6] []
[3, 1, 4, 1] [5, 9, 2, 6]
[(0, 3), (1, 1)]
[(3, "a"), (1, "b")]
[1, 2, 3] [3, 2, 1]
[1, 2, 3]
```

## Consumers

| Method | Result | Behaviour |
| --- | --- | --- |
| `toList()` | `[T]` | Collect into a list. |
| `toSet()` | `set<T>` | Collect into a set, dropping repeats. |
| `count()` | `int` | How many elements. |
| `sum()` | `T` | Add the elements of an iterator of numbers; `0` when empty. Overflow stops, like `+`. |
| `fold(init, f)` | `U` | Combine all elements, starting from `init`. |
| `any(f)`, `all(f)` | `bool` | Does `f` hold for some, or for every, element? `all` of nothing is `true`. |
| `find(f)` | `T?` | The first element for which `f` holds. |
| `position(f)` | `int?` | The index of that element. |
| `first()`, `last()`, `nth(n)` | `T?` | The first, final, or `n`th (from 0) element; `none` when absent. |
| `min()`, `max()` | `T?` | Smallest or largest; `none` when empty. Needs `order`. |
| `each(f)` | | Call `f` for each element. |
| `join(sep)` | `string` | For an iterator of text: the pieces joined. |

```pelago
fn main() {
    const xs = [3, 1, 4, 1, 5, 9, 2, 6]
    print(xs.iter().fold(0, (a, x) ~> a + x), xs.iter().sum(), xs.iter().count())
    print(xs.iter().any(x ~> x > 8), xs.iter().all(x ~> x > 1))
    print(xs.iter().find(x ~> x > 4), xs.iter().position(x ~> x == 4))
    print(xs.iter().nth(1), xs.iter().nth(99), xs.iter().first(), xs.iter().last())
    print(xs.iter().min(), xs.iter().max(), [1, 2, 2, 3].iter().toSet())
    const none_: [int] = []
    print(none_.iter().min(), none_.iter().sum(), none_.iter().all(x ~> x > 1))
    print("x y z".split(" ").join("+"))
}
```

```text
31 31 8
true false
some(5) some(2)
some(1) none some(3) some(6)
some(1) some(9) {1, 2, 3}
none 0 true
x+y+z
```

## Ranges

A range `a..b` or `a..=b` of integers is walked with `for` and can be turned into an iterator with `iter()`. `for i of 0..10 step 3` takes a step in the loop head. An open range with no start or end stops when walked (`an open range with no end cannot be iterated`). `x in a..b` tests membership.

## Not finished

- Printing a range value itself (`print(0..5)`) is not lowered yet.
- `(a..b step s).iter()` ignores the step; use `for ... step`.

## Related

[`list`](./list.md), [`map`](./map.md), [`set`](./set.md), [`str`](../text/str.md)
