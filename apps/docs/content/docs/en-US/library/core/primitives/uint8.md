---
title: uint8
description: "The 8-bit unsigned integer: range, literals, checked arithmetic, wrapping, shifts and conversions."
---

`uint8` is a 8-bit unsigned binary integer (also written `byte`). Its values run from `0` to `255`.

## Writing a value

A literal takes the type the context asks for: `const a: uint8 = 255`. A literal outside the range is an error at compile time, naming the type (``256 does not fit in `uint8` ``). Hexadecimal, binary and octal forms and `_` separators work as for [`int`](./int.md#writing-a-value). An unsigned type has no negative literal: `-1` is rejected.

## Arithmetic

`+ - * / %`, `++`, `--` and the `op=` forms work on two values of the same type. **Every result is checked against this type's range**, not against `int`'s: a result outside `0` to `255` stops the program with `stopped: arithmetic overflow`. That includes going below zero: `3 - 4` stops. Division and remainder by zero stop with `stopped: division by zero`. Unary minus is a compile error (``cannot negate `uint8` ``).

| Operator | Behaviour |
| --- | --- |
| `a +% b`, `a -% b`, `a *% b` | Wrap around modulo 2^8. Never stop. |
| `a & b`, `a \| b`, `a ^ b`, `~a` | Bitwise on the 8 bits. |
| `a << n` | Shifts left; bits shifted out are dropped, with no overflow stop. |
| `a >> n` | Shifts right; logical (zeros come in). |
| shift by `n` | `n` equal to or above 8 stops with `stopped: shifted by the width or more`. |

Mixing types is an error, not a silent widening: `a + b` with an `int8` and an `int16` says ``cannot use `+` on `int8` and `int16`; convert with `to` ``.

```pelago
fn main() {
    const lo: uint8 = 0
    const hi: uint8 = 255
    print("#lo #hi")
    print("#(hi +% 1) #(lo -% 1) #(hi *% 2)")
    print("#(hi / 2) #(hi % 10) #(hi & 15) #(hi >> 1) #(hi << 1)")
    const n: int = hi to int
    print("#n")
}
```

```text
0 255
0 255 254
127 5 15 127 254
255
```

An overflowing `+` stops instead of wrapping:

```pelago exit
fn main() {
    var x: uint8 = 255
    x += 1
    print("not reached")
}
```

```text
arithmetic overflow
```

## Methods

`uint8` has no methods of its own yet: not `abs`, `min`, `max` or `pow`. Convert to [`int`](./int.md) for those: `(x to int).abs()`, where the conversion is allowed (see below), and narrow the result back with the `wrapTo...` or `to...Checked` methods of `int`.

## Converting

`to` converts when no value can be lost. Checked against the compiler, `x to T` is accepted for: `int16`, `int32`, `int64`, `int`, `uint16`, `uint32`, `uint64`, `uint`, `int128`, `uint128`, `int256`, `uint256`, `float`. Every other target is refused, including going to a narrower type and to a signed type of the same or smaller width; use `int`'s `wrapTo...` and `to...Checked` methods, or compare and convert in steps. `n to float` is accepted when listed above, and rounds when `n` has more significant bits than the float.

## Equality, ordering and hashing

A `uint8` is `eq`, `order`, `hash` and `show`: it compares numerically, works as a map key, a set member and a sort key, and prints in `#( )` strings.

## Related

[`int`](./int.md), [Wide integers](../wide-integers.md), [Operators](../../../reference/operators/index.md)
