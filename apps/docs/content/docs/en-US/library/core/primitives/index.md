---
title: Primitive types
description: "The types built into the language: truth values, characters, integers and floats. One page per type."
---

A primitive type is built into the compiler. Its values are small, it is always copied rather than moved, and its methods come with the type, so nothing is imported to call `x.abs()` or `c.isDigit()`.

Each type has its own page: what it is, how a value is written, every operator and method, what happens at the edges, and what is not finished.

| Type | What it is | Page |
| --- | --- | --- |
| `bool` | `true` or `false`. | [bool](./bool.md) |
| `char` | One Unicode scalar value. | [char](./char.md) |
| `int` | The default signed integer, 64 bits. | [int](./int.md) |
| `int8`, `int16`, `int32` | Signed integers of a given width. | [int8](./int8.md), [int16](./int16.md), [int32](./int32.md) |
| `int64` | Another name for `int`. | [int64](./int64.md) |
| `uint8`, `uint16`, `uint32`, `uint64` | Unsigned integers of a given width. | [uint8](./uint8.md), [uint16](./uint16.md), [uint32](./uint32.md), [uint64](./uint64.md) |
| `byte`, `uint` | Other names for `uint8` and `uint64`. | [byte](./byte.md), [uint](./uint.md) |
| `float` | The default floating point number, 64 bits. | [float](./float.md) |

The wide integers (`int128`, `uint128`, `int256`, `uint256`) and the other float formats (`float32`, `float16`, `float128`, `float256`) are covered in [Wide integers](../wide-integers.md) and [Wide and narrow floats](../wide-floats.md) until they get pages of their own.

## Rules every primitive shares

- **Value semantics.** Assigning, passing or returning a primitive copies it. There is no `inout` or `sink` to think about for a plain `int`.
- **No implicit conversions.** `int` and `float` are never mixed silently. `n to float` is written out; see [Conversions](./int.md#converting-to-and-from-other-types).
- **Checked arithmetic.** An integer result that does not fit stops the program with `stopped: arithmetic overflow`. The `%` forms (`+%`, `-%`, `*%`) wrap on purpose.
- **Printing.** Every primitive can be put in a `#( )` string and passed to `print`.
