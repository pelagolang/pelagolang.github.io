---
title: Ranges
description: "a..b and a..=b, step, open ranges, membership with in, and the places a range can be used."
---

A range is a span of values written with `..` (end excluded) or `..=` (end included).

| Form | Meaning |
| --- | --- |
| `a..b` | `a` up to but not including `b` |
| `a..=b` | `a` up to and including `b` |
| `a..`, `..b`, `..=b` | open at one end (slices and tests; not walkable) |

## Walking a range

```pelago
fn main() {
    for i of 0..3 {
        print(i)
    }
    for i of 1..=3 {
        print(i)
    }
}
```

```text
0
1
2
1
2
3
```

## step

`step` after a range in a `for` head sets the increment. A negative step counts down, from the larger value:

```pelago
fn main() {
    for i of 0..10 step 4 {
        print(i)
    }
    for i of 10..0 step -3 {
        print(i)
    }
}
```

```text
0
4
8
10
7
4
1
```

## Membership

`x in a..b` tests whether `x` lies in the range, for integers and other ordered types such as `char`. It is also what `switch` range patterns do ([Pattern matching](../switch.md#values-and-ranges)).

```pelago
fn main() {
    const n = 5
    const c = 'q'
    print(n in 0..5, n in 0..=5, c in 'a'..='z')
    print((1..=3).contains(3))
}
```

```text
false true true
true
```

## Slicing

A range indexes a list or a string to take a part: `xs[1..3]`, `s[..2]`, `xs[2..]`. See [`list`](../../library/core/collections/list.md#indexing-and-slicing) and [`str`](../../library/core/text/str.md#slicing).

## As an iterator

`(a..b).iter()` is an [`iter<int>`](../../library/core/collections/iter.md), so the adapters apply. An open range (no start or no end) stops when walked: ``an open range with no end cannot be iterated``.

## Not finished

- Printing a range value (`print(0..5)`) is not lowered yet.
- `(a..b step s).iter()` ignores the step; use `for ... step`.
- A range stored in a variable cannot be used as a `for` source yet.

## Related

[for](./for.md), [Pattern matching](../switch.md)
