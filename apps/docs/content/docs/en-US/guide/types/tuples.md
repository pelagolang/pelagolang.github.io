---
title: Tuples
description: "Tuples: unnamed groups of values, their types, field access with .0, destructuring, comparison, and returning several values."
---

A tuple groups a fixed number of values of any types. Write it with parentheses; its type is the list of the component types.

```pelago
fn main() {
    const t = (1, "a", 2.5)
    print(t, t.0, t.1)
    const (a, b, c) = t
    print(a, b, c)
}
```

```text
(1, "a", 2.5) 1 a
1 a 2.5
```

## Reading and changing

`t.0`, `t.1`, ... read a component. On a `var`, a component can be assigned.

```pelago
fn main() {
    var u: (int, int) = (3, 4)
    u.0 = 9
    print(u)
}
```

```text
(9, 4)
```

## Returning several values

A function returns a tuple instead of using output parameters:

```pelago
fn swap(p: (int, int)) -> (int, int) = (p.1, p.0)

fn divmod(a: int, b: int) -> (int, int) = (a / b, a % b)

fn main() {
    print(swap((1, 2)))
    const (q, r) = divmod(17, 5)
    print(q, r)
}
```

```text
(2, 1)
3 2
```

## Comparing

Tuples of comparable components compare with `==` and `<`, component by component from the first:

```pelago
fn main() {
    print((1, 2) == (1, 2), (1, 2) < (1, 3), (2, 0) < (1, 9))
}
```

```text
true true false
```

## Tuples and structs

Use a tuple for a short-lived grouping, and a `struct` when the parts have names or the type has methods. A tuple of owning values (strings, lists) moves as one.

## Related

- [Braids](../braids.mdx): fixed-size sequences with alternating types, written `(int, string; 3)`.
- [Structs](./struct.md), [Type aliases](./aliases.md), [Pattern matching](../switch.md)
