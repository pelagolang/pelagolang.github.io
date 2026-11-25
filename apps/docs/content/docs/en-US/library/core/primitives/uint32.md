---
title: uint32
description: "The 32-bit unsigned integer: range, literals, checked arithmetic, wrapping, shifts and conversions."
---

`uint32` is a 32-bit unsigned binary integer. Its values run from `0` to `4294967295`.

## Writing a value

A literal takes the type the context asks for: `const a: uint32 = 4294967295`. A literal outside the range is an error at compile time, naming the type (``4294967296 does not fit in `uint32` ``). Hexadecimal, binary and octal forms and `_` separators work as for [`int`](./int.md#writing-a-value). An unsigned type has no negative literal: `-1` is rejected.

## Arithmetic

`+ - * / %`, `++`, `--` and the `op=` forms work on two values of the same type. **Every result is checked against this type's range**, not against `int`'s: a result outside `0` to `4294967295` stops the program with `stopped: arithmetic overflow`. That includes going below zero: `3 - 4` stops. Division and remainder by zero stop with `stopped: division by zero`. Unary minus is a compile error (``cannot negate `uint32` ``).

| Operator | Behaviour |
| --- | --- |
| `a +% b`, `a -% b`, `a *% b` | Wrap around modulo 2^32. Never stop. |
| `a & b`, `a \| b`, `a ^ b`, `~a` | Bitwise on the 32 bits. |
| `a << n` | Shifts left; bits shifted out are dropped, with no overflow stop. |
| `a >> n` | Shifts right; logical (zeros come in). |
| shift by `n` | `n` equal to or above 32 stops with `stopped: shifted by the width or more`. |

Mixing types is an error, not a silent widening: `a + b` with an `int8` and an `int16` says ``cannot use `+` on `int8` and `int16`; convert with `to` ``.

```pelago
fn main() {
    const lo: uint32 = 0
    const hi: uint32 = 4294967295
    print("#lo #hi")
    print("#(hi +% 1) #(lo -% 1) #(hi *% 2)")
    print("#(hi / 2) #(hi % 10) #(hi & 15) #(hi >> 1) #(hi << 1)")
    const n: int = hi to int
    print("#n")
}
```

```text
0 4294967295
0 4294967295 4294967294
2147483647 5 15 2147483647 4294967294
4294967295
```

An overflowing `+` stops instead of wrapping:

```pelago exit
fn main() {
    var x: uint32 = 4294967295
    x += 1
    print("not reached")
}
```

```text
arithmetic overflow
```

## Methods

`uint32` has no methods of its own yet: not `abs`, `min`, `max` or `pow`. Convert to [`int`](./int.md) for those: `(x to int).abs()`, where the conversion is allowed (see below), and narrow the result back with the `wrapTo...` or `to...Checked` methods of `int`.

## Converting

`to` converts when no value can be lost. Checked against the compiler, `x to T` is accepted for: `int64`, `int`, `uint64`, `uint`, `int128`, `uint128`, `int256`, `uint256`, `float`. Every other target is refused, including going to a narrower type and to a signed type of the same or smaller width; use `int`'s `wrapTo...` and `to...Checked` methods, or compare and convert in steps. `n to float` is accepted when listed above, and rounds when `n` has more significant bits than the float.

## Equality, ordering and hashing

A `uint32` is `eq`, `order`, `hash` and `show`: it compares numerically, works as a map key, a set member and a sort key, and prints in `#( )` strings.

## Related

[`int`](./int.md), [Wide integers](../wide-integers.md), [Operators](../../../reference/operators.md)
