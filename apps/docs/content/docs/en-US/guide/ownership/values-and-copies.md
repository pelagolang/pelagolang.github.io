---
title: Values and copies
description: "Value semantics in Pelago: assignment of plain data copies, assignment of owning data moves, and copy makes a second independent value."
---

In Pelago a variable holds a value, not a pointer to a shared object. Changing one variable can never change another. Two things decide what an assignment does: whether the data is plain, and whether you write `copy`.

## Plain data is copied

Numbers, `bool`, `char`, `byte`, enums without payloads, and tuples and structs whose fields are all plain are small and own no memory. Assigning them copies the bytes, and both names stay usable.

```pelago
fn main() {
    var n = 5
    const m = n
    n += 1
    print(m, n)

    struct pt { x: int, y: int }
    var p = pt { x: 1, y: 2 }
    const q = p
    p.x = 10
    print(q.x, p.x)
}
```

```text
5 6
1 10
```

## Owning data is moved

A `string`, a list, a map, a set, a `box` and any struct or tuple that contains one owns memory. Assigning it **moves** the value: the new name owns it and the old name may not be used again. See [Moves](./moves.md).

## `copy` makes a second value

Write `copy` in front of an expression to get an independent duplicate. The original stays valid, and changing one never changes the other. A copy is deep: a list of lists is duplicated all the way down.

```pelago
fn main() {
    var a = [[1, 2], [3]]
    var b = copy a
    b[0][0] = 99
    b.push!([4])
    print(a)
    print(b)
}
```

```text
[[1, 2], [3]]
[[99, 2], [3], [4]]
```

`copy` costs what copying costs: time and memory proportional to the size of the value. Plain data never needs it, since assignment already copies.

## Copying out of a container

A value inside a list, map or field cannot be moved out by itself, because that would leave a hole in the container. The compiler asks for `copy`:

```pelago error
fn main() {
    var xs = [[1], [2]]
    const first = xs[0]
    print(first)
}
```

```text
main:3:19: error: `xs[0]` cannot be taken out of `xs`; write `copy xs[0]`
```

```pelago
fn main() {
    var xs = [[1], [2]]
    const first = copy xs[0]
    print(first, xs)
}
```

```text
[1] [[1], [2]]
```

The same message appears for a field of a struct (`p.a cannot be taken out of p`). Reading is always fine: `xs[0].len()` or `print(xs[0])` look at the element without taking it.

## Passing values to functions

A plain argument is passed without copying anything the function could change; see [Read access](./read-access.md). You do not need `copy` to call a function with a list: the function receives a read-only view.

```pelago
fn first(xs: [int]) -> int = xs[0]

fn main() {
    const xs = [4, 5]
    print(first(xs), first(xs))
    print(xs)
}
```

```text
4 4
[4, 5]
```

## Edge cases

- `copy` of a plain value is allowed and does nothing useful.
- A `copy` of a value that has a `deinit` runs the cleanup once per copy, because there are two owners. See [Cleanup](./cleanup.md).
- `box<T>` copies its content too: the copy gets its own heap allocation.

## Related

- [Moves](./moves.md), [Read access](./read-access.md), [Cleanup](./cleanup.md)
- [Collections](../collections.md)
