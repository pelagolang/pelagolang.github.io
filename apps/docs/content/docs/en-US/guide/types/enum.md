---
title: Enums
description: "enum: cases with and without fields, constructing them, the leading-dot shorthand, switch and is, exhaustiveness, deriving show, and generic enums."
---

An `enum` is a choice between named cases. Each case can carry values, either unnamed or named. An enum value is exactly one of its cases at a time.

```pelago
enum shape {
    circle(radius: float)
    rect(w: float, h: float)
    empty
}

fn main() {
    const s = shape.circle(2.0)
    if s is .circle(r) { print("radius #r") }
}
```

```text
radius 2
```

## Declaring and building

A case is a name, optionally followed by a parenthesised list. Fields are `name: type` or just a type. Build a case by calling it through the enum: `shape.circle(2.0)`. A case with no fields is written without parentheses: `shape.empty`.

A leading dot (`.circle`) asks the compiler to find the case in the expected enum, so the type name can be left out when it is clear from context: `name(.west)`.

## Taking an enum apart

Use `switch` with one `case` per variant, or `is` to test one. See [Pattern matching](../switch/index.md) for every pattern form.

```pelago
enum dir { north, south, east, west }

fn name(d: dir) -> string {
    switch d {
        case .north: "n"
        case .south: "s"
        default: "other"
    }
}

fn main() {
    print(name(dir.north), name(.west), dir.east == dir.east, dir.east != dir.north)
}
```

```text
n other true true
```

## Exhaustiveness

A `switch` must handle every case or have a `default`. Forgetting one is a compile error that names it, so adding a case to an enum shows you every `switch` you must update:

```pelago error
enum dir { north, south }

fn name(d: dir) -> string {
    switch d {
        case .north: "n"
    }
}

fn main() {
    print(name(.north))
}
```

```text
main:4:12: error: this `switch` does not handle `.south`; add a case for it or a `default`
```

## Cases with fields

```pelago
enum res {
    good(int)
    bad(msg: string)
}

fn main() {
    const r = res.bad(msg: "no")
    switch r {
        case .good(n): print(n)
        case .bad(m): print(m)
    }
}
```

```text
no
```

## Printing and comparing

Cases without fields compare with `==` directly. To print an enum, derive `show`:

```pelago
@derive(show)
enum res {
    good(int)
    bad(msg: string)
    empty
}

fn main() {
    print(res.good(3), res.bad(msg: "no"), res.empty)
}
```

```text
good(3) bad("no") empty
```

`@derive(eq)`, `@derive(order)` and `@derive(hash)` work the same way; see [Interfaces in core](../../library/core/interfaces/index.md).

## Generic enums

An enum can take type parameters, like `option` and `result` do in the library. See [Generics](./generics.md).

```pelago
@derive(show)
enum tree<T> {
    leaf
    node(T, T)
}

fn main() {
    const a: tree<int> = tree.node(1, 2)
    print(a)
}
```

```text
node(1, 2)
```

## Edge cases

- `none` and other reserved words cannot be case names. `empty`, `leaf` and `missing` are fine.
- A recursive enum needs a [`box`](../ownership/box.md) for the self-reference.

## Related

- [Pattern matching](../switch/index.md), [Structs](./struct.md), [Options](../../library/core/options/option.md), [Results](../../library/core/options/result.md)
