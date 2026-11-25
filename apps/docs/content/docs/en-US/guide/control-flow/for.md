---
title: for
description: "for walks a range, a list, a map, a set, a string or any iterator; the loop variable, destructuring and what it can change."
---

`for x of source { ... }` runs the block once per element. `of` is the spelling used throughout; `in` is accepted in the same place.

```pelago
fn main() {
    for i of 0..3 {
        print(i)
    }
    for i in 0..=2 {
        print(i)
    }
}
```

```text
0
1
2
0
1
2
```

## What can be walked

| Source | The variable is |
| --- | --- |
| A range of integers, `0..n` | each `int` |
| A [list](../../library/core/collections/list.md) | each element |
| A [map](../../library/core/collections/map.md) | a pair `(key, value)` |
| A [set](../../library/core/collections/set.md) | each element |
| `s.chars()`, `s.bytes()`, `s.lines()`, `s.split(sep)` | each `char`, `byte` or `str` |
| Any [`iter<T>`](../../library/core/collections/iter.md) | each `T` |

```pelago
fn main() {
    var m: map<string, int> = map { "a": 1 }
    for (k, v) of m {
        print(k, v)
    }
    const t: set<int> = set { 7 }
    for x of t {
        print(x)
    }
    for (a, b) of [(1, 2), (3, 4)] {
        print(a + b)
    }
    for (i, x) of ["a", "b"].iter().enumerate() {
        print(i, x)
    }
    for c of "hé".chars() {
        print(c)
    }
}
```

```text
a 1
7
3
7
0 a
1 b
h
é
```

A pattern in the head takes a tuple apart (`for (k, v) of m`).

## Changing the elements

The loop variable is a view of the element, so assigning to it is an error. Bind it with `inout` to change the elements in place:

```pelago error
fn main() {
    var xs = [1, 2, 3]
    for x of xs {
        x += 1
    }
}
```

```text
`x` only views part of another value; bind it with `inout x` to change it
```

## Empty and reversed ranges

A range whose start is not below its end has no elements, so the body never runs. `for i of 5..2` prints nothing. Walk backwards with a negative [step](./ranges.md#step) or `.iter().reversed()`.

## Not finished

A range kept in a variable (`const r = 1..4`, then `for i of r`) is **not lowered yet**; write the range in the loop head.

## Related

[Ranges](./ranges.md), [while](./while.md), [loop](./loop.md), [`iter`](../../library/core/collections/iter.md)
