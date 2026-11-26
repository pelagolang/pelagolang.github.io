---
title: Options and results
description: "T? for a value that may be absent, T ! E for an operation that may fail, and the shared error types."
---

Pelago has no `null` and no exceptions. Absence and failure are values:

| Type | Written | Meaning | Page |
| --- | --- | --- | --- |
| `option<T>` | `T?` | A `T`, or `none`. | [option](./option.md) |
| `result<T, E>` | `T ! E` | A `T` made with `ok(x)`, or an error of type `E` made with `err(e)`. | [result](./result.md) |
| `parse_error`, `io_error`, `io_kind`, `error` | | The error types `core` and `std` return. | [Error types](./errors.md) |

The operators that work on them are in [Operators](../../../reference/operators.md): `??` (fallback), `??=`, `?.` (chaining) and `?` (unwrap or return the failure). The guide pages [Errors and options](../../../guide/errors.md) show how to design with them.
