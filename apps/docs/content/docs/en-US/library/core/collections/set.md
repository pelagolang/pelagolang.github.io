---
title: set
description: "set<T>: unique values in insertion order: literals, membership, insert and remove results, equality."
---

`set<T>` holds each value at most once. Elements must support `eq` and `hash`. Iteration follows insertion order.

## Writing a value

`set { 1, 2, 3 }` is a literal and `set {}` an empty one, typed from context. `xs.iter().toSet()` builds one from any sequence.

## Methods

| Method | Result | Behaviour |
| --- | --- | --- |
| `len()`, `isEmpty()` | | |
| `contains(x)` | `bool` | `x in s` is the same test. |
| `insert!(x)` | `bool` | `true` when `x` was not already present; a repeat leaves the set unchanged. |
| `remove!(x)` | `bool` | `true` when `x` was present. |
| `clear!()` | | |
| `iter()` | `iter<T>` | The elements in insertion order. |

```pelago
fn main() {
    var seen: set<int> = set { 3, 1, 2 }
    print(seen.insert!(2), seen.insert!(0))
    print(seen, seen.contains(2), seen.len())
    print(seen.remove!(1), seen.remove!(1), seen)
    for x of seen {
        print(x)
    }
}
```

```text
false true
{3, 1, 2, 0} true 4
true false {3, 2, 0}
3
2
0
```

## Equality

Two sets are equal when they have the same elements, regardless of order. Plain structs work as elements when all their fields do.

```pelago
fn main() {
    struct p { x: int, y: int }

    const a: set<int> = set { 1, 2 }
    const b: set<int> = set { 2, 1 }
    var points: set<p> = set {}
    points.insert!(p { x: 1, y: 2 })
    print(a == b, points.contains(p { x: 1, y: 2 }), points.len())
}
```

```text
true true 1
```

## Related

[`map`](./map.md), [`list`](./list.md), [`iter`](./iter.md)
