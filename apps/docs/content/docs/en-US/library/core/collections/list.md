---
title: list
description: "The growable sequence list<T>, written [T]: literals, indexing and slicing, every method, edge cases and what stops the program."
---

`list<T>`, written `[T]`, is a growable sequence of values of one type, stored contiguously. Elements are numbered from 0.

## Writing a value

`[1, 2, 3]` is a list literal, `[]` an empty one (its type comes from context: `const xs: [int] = []`), and `list<int>` is the long spelling of `[int]`.

### Repeating a value: `[value; n]`

`[value; n]` repeats one value `n` times. What it makes depends on `n`:

- A count known when the program is compiled (a literal or a `const`) makes a fixed [array](./array.md), `[T; N]`.
- Any other count, such as a function result or a parameter, makes a list of `n` **independent copies**: changing one element never changes another, even when the element is a string, a struct or a list.

```pelago
struct pt { x: int, y: int }

fn count() -> int = 3

fn main() {
    const n = count()
    var flags = [false; n]
    flags[1] = true
    print(flags)
    var points = [pt { x: 1, y: 2 }; n]
    points[1].x = 9
    print(points[0].x, points[1].x)
    var grid = [[1, 2]; n]
    grid[0][0] = 7
    print(grid)
    var empty = [0; n - 3]
    print(empty.len())
}
```

```text
[false, true, false]
1 9
[[7, 2], [1, 2], [1, 2]]
0
```

A count of 0 gives an empty list that owns nothing. A negative count stops with `stopped: negative list length`. A count whose elements could never fit (more than 2^40 bytes in total, 1 TiB) stops with `stopped: list length too large`, before any memory is requested.

## Indexing and slicing

`xs[i]` is the element at `i`. `xs[a..b]`, `xs[a..]`, `xs[..b]` and `xs[a..=b]` are [slices](./slice.md): temporary windows onto the list, not copies. Use `copy xs[a..b]` for an owned list.

```pelago
fn main() {
    const xs = [1, 2, 3, 4]
    print(xs[0], xs[3])
    print(xs[1..3], xs[2..], xs[..2], xs[1..=2], xs[0..0])
}
```

```text
1 4
[2, 3] [3, 4] [1, 2] [2, 3] []
```

**Edges.** `xs[i]` with `i` below 0 or at or above `len()` stops with `stopped: index out of range`; there are no negative indices. A slice that leaves `0..len()` stops with `stopped: slice out of range`. Use `get(i)` for a checked read.

## Size and access

| Method | Result | Behaviour |
| --- | --- | --- |
| `len()` | `int` | Number of elements. |
| `isEmpty()` | `bool` | |
| `get(i)` | `T?` | The element, or `none` when `i` is out of range (including negative). |
| `first()`, `last()` | `T?` | `none` on an empty list. |
| `contains(x)` | `bool` | Needs `eq`. `x in xs` is the same test. |
| `indexOf(x)` | `int?` | The position of the first element equal to `x`. Needs `eq`. |
| `binarySearch(x)` | `int?` | The position of `x` in a **sorted** list; on an unsorted list the answer is not meaningful. Needs `order`. |

## Changing a list

These need a `var` and are called with `!`.

| Method | Result | Behaviour |
| --- | --- | --- |
| `push!(x)` | | Add at the end. |
| `pop!()` | `T?` | Remove and return the last element; `none` when empty. |
| `insert!(i, x)` | | Insert before position `i`. `i == len()` appends. Any other out-of-range `i` stops with `insert: index out of range`. |
| `remove!(i)` | `T` | Remove and return the element at `i`. Out of range stops with `remove: index out of range`. |
| `clear!()` | | Remove everything. |
| `extend!(other)` | | Append another list. |
| `reserve!(n)` | | Make room for `n` more elements without reallocating. |
| `truncate!(n)` | | Keep the first `n`; a larger `n` changes nothing. |
| `retain!(f)` | | Keep only the elements for which `f` holds. |
| `dedup!()` | | Remove repeated **neighbours**: `[1, 1, 2, 1]` becomes `[1, 2, 1]`. Needs `eq`. |
| `swap!(a, b)` | | Exchange two elements. |
| `reverse!()` | | Reverse in place. |
| `sort!()` | | Sort ascending in place. Needs `order`. |
| `sortBy!(f)` | | Sort with `f(a, b)` returning a negative, zero or positive `int`. |

```pelago
fn main() {
    var xs = [5, 3, 8, 1]
    xs.sort!()
    xs.extend!([10, 12])
    xs.swap!(0, 1)
    xs.insert!(0, 7)
    print(xs)
    print(xs.remove!(0), xs.pop!(), xs)
    xs.truncate!(2)
    print(xs)
    xs.clear!()
    print(xs, xs.len(), xs.pop!())
}
```

```text
[7, 3, 1, 5, 8, 10, 12]
7 some(12) [3, 1, 5, 8, 10]
[3, 1]
[] 0 none
```

```pelago
fn main() {
    var d = [1, 1, 2, 2, 2, 1, 3, 3]
    d.dedup!()
    print(d)
    var r = [1, 2, 3, 4, 5, 6]
    r.retain!(x ~> x % 2 == 0)
    print(r)
    var w = ["pear", "fig", "apple", "kiwi"]
    w.sortBy!((a, b) ~> a.len() - b.len())
    print(w)
}
```

```text
[1, 2, 1, 3]
[2, 4, 6]
["fig", "pear", "kiwi", "apple"]
```

Sorting an empty list does nothing. In `sortBy!`, elements the comparison calls equal keep their original relative order in every test so far, but the order of ties is not promised.

## New lists from a list

| Method | Result | Behaviour |
| --- | --- | --- |
| `sorted()` | `[T]` | A sorted copy. |
| `reversed()` | `[T]` | A reversed copy. |
| `toList()` | `[T]` | A copy. |
| `chunks(n)` | `iter<[T]>` | Pieces of `n` elements; the last may be shorter. `n` of 0 or less stops with `chunks: size must be positive`. |
| `toArray()` | `[T; N]?` | The items as a fixed-size array whose length `N` comes from the type it lands in; `none` when the length differs. |
| `asArray()` | `[T; N]` | The same, stopping with `asArray: the list has 3 items, not 2` when the length differs. |

```pelago
fn main() {
    const xs = [4, 8, 15, 16, 23, 42]
    print(xs.indexOf(15), xs.indexOf(5), xs.binarySearch(23), xs.binarySearch(24))
    print(xs.sorted().reversed() == xs.reversed(), [1, 2, 3, 4, 5].chunks(2).toList())
    const a: [int; 3]? = [1, 2, 3].toArray()
    const b: [int; 2]? = [1, 2, 3].toArray()
    print(a, b)
}
```

```text
some(2) none some(4) none
true [[1, 2], [3, 4], [5]]
some([1, 2, 3]) none
```

## Walking a list

`for v of xs` visits each element. `xs.iter()` gives an [`iter<T>`](./iter.md) with all the adapters (`map`, `filter`, `fold`, ...); `map`, `filter` and `each` are also available directly on the list. `xs.iter()` and `toList()` copy the list.

```pelago
fn main() {
    const xs = [10, 20, 30]
    for i of 0..xs.len() {
        print(i, xs[i])
    }
    for (i, v) of xs.iter().enumerate() {
        print("#i=#v")
    }
    print(xs.map(x ~> x / 10).toList(), xs.filter(x ~> x > 10).toList())
}
```

```text
0 10
1 20
2 30
0=10
1=20
2=30
[1, 2, 3] [20, 30]
```

## Equality, ordering and copying

`==` compares length and elements. Lists of ordered elements compare lexicographically: `[1, 2] < [1, 3]` is `true`. `+` does not join lists; use `extend!`. A list assigned to another variable moves; `copy` duplicates it.

```pelago
fn main() {
    var a = [1, 2]
    var b = copy a
    b.push!(3)
    print(a, b, a == [1, 2], [1, 2] < [1, 3], 2 in a)
}
```

```text
[1, 2] [1, 2, 3] true true true
```

## Edge cases

- `pop!` and `get` on an empty list give `none`; `xs[0]`, `remove!(0)` stop.
- `[v; n]` with a negative `n` stops with `negative list length`; an enormous `n` stops with `list length too large`.
- `chunks(0)` stops; `truncate!(n)` with `n >= len()` does nothing.
- `binarySearch` on an unsorted list returns some position or `none`, never an error.

## Related

[`iter`](./iter.md), [`map`](./map.md), [`set`](./set.md), [Text](../text/index.md) (`join`), [Collections guide](../../../guide/collections.md)
