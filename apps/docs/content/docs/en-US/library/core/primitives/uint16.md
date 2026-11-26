---
title: uint16
description: "The 16-bit unsigned integer: range, literals, checked arithmetic, wrapping, shifts and conversions."
---

`uint16` is a 16-bit unsigned binary integer. Its values run from `0` to `65535`.

## Writing a value

A literal takes the type the context asks for: `const a: uint16 = 65535`. A literal outside the range is an error at compile time, naming the type (``65536 does not fit in `uint16` ``). Hexadecimal, binary and octal forms and `_` separators work as for [`int`](./int.md#writing-a-value). An unsigned type has no negative literal: `-1` is rejected.

## Arithmetic

`+ - * / %`, `++`, `--` and the `op=` forms work on two values of the same type. **Every result is checked against this type's range**, not against `int`'s: a result outside `0` to `65535` stops the program with `stopped: arithmetic overflow`. That includes going below zero: `3 - 4` stops. Division and remainder by zero stop with `stopped: division by zero`. Unary minus is a compile error (``cannot negate `uint16` ``).

| Operator | Behaviour |
| --- | --- |
| `a +% b`, `a -% b`, `a *% b` | Wrap around modulo 2^16. Never stop. |
| `a & b`, `a \| b`, `a ^ b`, `~a` | Bitwise on the 16 bits. |
| `a << n` | Shifts left; bits shifted out are dropped, with no overflow stop. |
| `a >> n` | Shifts right; logical (zeros come in). |
| shift by `n` | `n` equal to or above 16 stops with `stopped: shifted by the width or more`. |

Mixing types is an error, not a silent widening: `a + b` with an `int8` and an `int16` says ``cannot use `+` on `int8` and `int16`; convert with `to` ``.

```pelago
fn main() {
    const lo: uint16 = 0
    const hi: uint16 = 65535
    print("#lo #hi")
    print("#(hi +% 1) #(lo -% 1) #(hi *% 2)")
    print("#(hi / 2) #(hi % 10) #(hi & 15) #(hi >> 1) #(hi << 1)")
    const n: int = hi to int
    print("#n")
}
```

```text
0 65535
0 65535 65534
32767 5 15 32767 65534
65535
```

An overflowing `+` stops instead of wrapping:

```pelago exit
fn main() {
    var x: uint16 = 65535
    x += 1
    print("not reached")
}
```

```text
arithmetic overflow
```

## Methods

`uint16` has no methods of its own yet: not `abs`, `min`, `max` or `pow`. Convert to [`int`](./int.md) for those: `(x to int).abs()`, where the conversion is allowed (see below), and narrow the result back with the `wrapTo...` or `to...Checked` methods of `int`.

## Converting

`to` converts when no value can be lost. Checked against the compiler, `x to T` is accepted for: `int32`, `int64`, `int`, `uint32`, `uint64`, `uint`, `int128`, `uint128`, `int256`, `uint256`, `float`. Every other target is refused, including going to a narrower type and to a signed type of the same or smaller width; use `int`'s `wrapTo...` and `to...Checked` methods, or compare and convert in steps. `n to float` is accepted when listed above, and rounds when `n` has more significant bits than the float.

## Equality, ordering and hashing

A `uint16` is `eq`, `order`, `hash` and `show`: it compares numerically, works as a map key, a set member and a sort key, and prints in `#( )` strings.

## Related

[`int`](./int.md), [Wide integers](../wide-integers.md), [Operators](../../../reference/operators.md)
