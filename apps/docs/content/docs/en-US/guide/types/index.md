---
title: Types
description: "Defining your own types: struct, enum, obj with inheritance, interface and impl, generics, type aliases and tuples, one page each."
---

Type names are lowercase. Pelago has four ways to define your own types, plus aliases and tuples. This chapter has one page for each.

| Feature | Use it for | Page |
| --- | --- | --- |
| `struct` | A group of named fields with methods; plain data with value semantics. | [Structs](./struct.md) |
| `enum` | A choice between named cases, each optionally carrying fields. | [Enums](./enum.md) |
| `obj`, `open`, `override`, `:` | A family of types that share fields and default behaviour. | [Objects and inheritance](./obj.md) |
| `interface`, `impl`, `any` | Shared behaviour across unrelated types, static or dynamic. | [Interfaces](./interface.md) |
| `<T>`, bounds, `where` | Code and types that work for many types. | [Generics](./generics.md) |
| `type` | A second name for a type. | [Type aliases](./aliases.md) |
| `(a, b)` | Unnamed groups of values and their types. | [Tuples](./tuples.md) |

## Choosing

Start with `struct` and `enum`: they are plain values, cheap to copy, and a `switch` over an enum is checked for completeness. Add an `interface` when different types must be used through one set of methods. Reach for `obj` only when sharing fields and default behaviour through a base type is clearly the right model.

## What every type shares

- Names are lowercase: `user`, `shape`, `stack`.
- A value of any of these types follows the rules of [ownership](../ownership/index.md): plain data is copied, data that owns memory is moved, and `copy` makes a second value.
- Printing, comparing and hashing are opted into with `@derive(show, eq, order, hash, clone)` or an `impl`; see [Interfaces in core](../../library/core/interfaces/index.md). Without it, `print(x)` is an error:

```pelago error
struct point { x: int, y: int }

fn main() {
    print(point { x: 1, y: 2 })
}
```

```text
main:4:11: error: this has type `point`, but `any show` is expected; `point` does not provide `show`
```

The built-in types (numbers, text, lists, maps, options and results) are described in the [library](../../library/core/index.md).
