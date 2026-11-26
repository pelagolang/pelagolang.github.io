---
title: uint64
description: "The 64-bit unsigned integer: range, literals, checked arithmetic, wrapping, shifts and conversions."
---

`uint64` is a 64-bit unsigned binary integer (also written `uint`). Its values run from `0` to `18446744073709551615`.

## Writing a value

A literal takes the type the context asks for: `const a: uint64 = 18446744073709551615`. A literal outside the range is an error at compile time, naming the type (``18446744073709551616 does not fit in `uint64` ``). Hexadecimal, binary and octal forms and `_` separators work as for [`int`](./int.md#writing-a-value). An unsigned type has no negative literal: `-1` is rejected.

## Arithmetic

`+ - * / %`, `++`, `--` and the `op=` forms work on two values of the same type. **Every result is checked against this type's range**, not against `int`'s: a result outside `0` to `18446744073709551615` stops the program with `stopped: arithmetic overflow`. That includes going below zero: `3 - 4` stops. Division and remainder by zero stop with `stopped: division by zero`. Unary minus is a compile error (``cannot negate `uint64` ``).

| Operator | Behaviour |
| --- | --- |
| `a +% b`, `a -% b`, `a *% b` | Wrap around modulo 2^64. Never stop. |
| `a & b`, `a \| b`, `a ^ b`, `~a` | Bitwise on the 64 bits. |
| `a << n` | Shifts left; bits shifted out are dropped, with no overflow stop. |
| `a >> n` | Shifts right; logical (zeros come in). |
| shift by `n` | `n` equal to or above 64 stops with `stopped: shifted by the width or more`. |

Mixing types is an error, not a silent widening: `a + b` with an `int8` and an `int16` says ``cannot use `+` on `int8` and `int16`; convert with `to` ``.

```pelago
fn main() {
    const lo: uint64 = 0
    const hi: uint64 = 18446744073709551615
    print("#lo #hi")
    print("#(hi +% 1) #(lo -% 1) #(hi *% 2)")
    print("#(hi / 2) #(hi % 10) #(hi & 15) #(hi >> 1) #(hi << 1)")
}
```

```text
0 18446744073709551615
0 18446744073709551615 18446744073709551614
9223372036854775807 5 15 9223372036854775807 18446744073709551614
```

An overflowing `+` stops instead of wrapping:

```pelago exit
fn main() {
    var x: uint64 = 18446744073709551615
    x += 1
    print("not reached")
}
```

```text
arithmetic overflow
```

## Methods

`uint64` has no methods of its own yet: not `abs`, `min`, `max` or `pow`. Convert to [`int`](./int.md) for those: `(x to int).abs()`, where the conversion is allowed (see below), and narrow the result back with the `wrapTo...` or `to...Checked` methods of `int`.

## Converting

`to` converts when no value can be lost. Checked against the compiler, `x to T` is accepted for: `uint`, `int128`, `uint128`, `int256`, `uint256`, `float`. Every other target is refused, including going to a narrower type and to a signed type of the same or smaller width; use `int`'s `wrapTo...` and `to...Checked` methods, or compare and convert in steps. `n to float` is accepted when listed above, and rounds when `n` has more significant bits than the float.

## Equality, ordering and hashing

A `uint64` is `eq`, `order`, `hash` and `show`: it compares numerically, works as a map key, a set member and a sort key, and prints in `#( )` strings.

## Related

[`int`](./int.md), [Wide integers](../wide-integers.md), [Operators](../../../reference/operators/index.md)
