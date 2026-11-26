---
title: Numbers
description: "The integer and float types, checked arithmetic, and making a narrower integer."
---

| Type | Meaning |
| --- | --- |
| `int`, `uint` | The default signed integer (64 bits) and the unsigned machine integer. |
| `int8`, `int16`, `int32`, `int64` | Signed integers of a given width. |
| `uint8`, `uint16`, `uint32`, `uint64` | Unsigned integers of a given width. `byte` is another name for `uint8`. |
| `int128`, `uint128`, `int256`, `uint256` | Wide integers, with the same checked arithmetic. |
| `float`, `float32` | IEEE 754 floating point, 64 and 32 bits. |
| `float16`, `float128`, `float256` | IEEE 754 formats implemented in software. |

Arithmetic on every integer type is checked: a result that does not fit stops the program (see [Arithmetic](../operators/arithmetic.md)).

## Making a narrower integer

A narrower integer is made from an `int` explicitly. The `wrapTo...` methods wrap around, and the `to...Checked` methods return an option that is `none` when the value does not fit:

```pelago
fn main() {
    const n: int = 300
    print(n.wrapToByte(), n.toByteChecked(), 200.toByteChecked())
}
```

```text
44 none some(200)
```

The same pairs exist for the other widths (`wrapToInt16`, `toInt32Checked`, ...).

## Related

- [int](../../library/core/primitives/int.md), [uint8](../../library/core/primitives/uint8.md)
- [Wide integers](../../library/core/wide-integers.md), [Wide and narrow floats](../../library/core/wide-floats.md)
