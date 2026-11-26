---
title: Struct and tuple patterns
description: "Matching a struct by its fields with .. for the rest, matching tuples by position, and mixing literals and bindings."
---

## Structs

Write the struct name and the fields you care about. A literal must match, a name binds, and `..` ignores the remaining fields.

```pelago
struct point {
    x: int
    y: int
}

fn where_is(p: point) -> string {
    switch p {
        case point { x: 0, y: 0 }: "origin"
        case point { x, .. }: "x is #x"
    }
}

fn main() {
    print(where_is(point { x: 0, y: 0 }))
    print(where_is(point { x: 4, y: 9 }))
}
```

```text
origin
x is 4
```

`point { x, .. }` is short for `point { x: x, .. }`: the field name doubles as the binding.

## Tuples

A tuple pattern matches by position.

```pelago
fn main() {
    switch (1, "a") {
        case (1, s): print("one #s")
        default: print("x")
    }
}
```

```text
one a
```

## Related

- [Structs](../types/struct.md), [Tuples](../types/tuples.md), [Guards, default and exhaustiveness](./guards-default.md)
