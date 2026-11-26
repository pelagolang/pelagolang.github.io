---
title: int32
description: "The 32-bit signed integer: range, literals, checked arithmetic, wrapping, shifts and conversions."
---

`int32` is a 32-bit two's complement integer. Its values run from `-2147483648` to `2147483647`.

## Writing a value

A literal takes the type the context asks for: `const a: int32 = 2147483647`. A literal outside the range is an error at compile time, naming the type (``2147483648 does not fit in `int32` ``). Hexadecimal, binary and octal forms and `_` separators work as for [`int`](./int.md#writing-a-value).

## Arithmetic

`+ - * / %`, `++`, `--` and the `op=` forms work on two values of the same type. **Every result is checked against this type's range**, not against `int`'s: a result outside `-2147483648` to `2147483647` stops the program with `stopped: arithmetic overflow`. Division and remainder by zero stop with `stopped: division by zero`. Negating the smallest value, `-({lo})`, overflows and stops.

| Operator | Behaviour |
| --- | --- |
| `a +% b`, `a -% b`, `a *% b` | Wrap around modulo 2^32. Never stop. |
| `a & b`, `a \| b`, `a ^ b`, `~a` | Bitwise on the 32 bits. |
| `a << n` | Shifts left; bits shifted out are dropped, with no overflow stop. |
| `a >> n` | Shifts right; arithmetic (the sign is kept). |
| shift by `n` | `n` equal to or above 32 stops with `stopped: shifted by the width or more`. |

Mixing types is an error, not a silent widening: `a + b` with an `int8` and an `int16` says ``cannot use `+` on `int8` and `int16`; convert with `to` ``.

```pelago
fn main() {
    const lo: int32 = -2147483648
    const hi: int32 = 2147483647
    print("#lo #hi")
    print("#(hi +% 1) #(lo -% 1) #(hi *% 2)")
    print("#(hi / 2) #(hi % 10) #(hi & 15) #(hi >> 1) #(hi << 1)")
    const n: int = hi to int
    print("#n")
}
```

```text
-2147483648 2147483647
-2147483648 2147483647 -2
1073741823 7 15 1073741823 -2
2147483647
```

An overflowing `+` stops instead of wrapping:

```pelago exit
fn main() {
    var x: int32 = 2147483647
    x += 1
    print("not reached")
}
```

```text
arithmetic overflow
```

## Methods

`int32` has no methods of its own yet: not `abs`, `min`, `max` or `pow`. Convert to [`int`](./int.md) for those: `(x to int).abs()`, where the conversion is allowed (see below), and narrow the result back with the `wrapTo...` or `to...Checked` methods of `int`.

## Converting

`to` converts when no value can be lost. Checked against the compiler, `x to T` is accepted for: `int64`, `int`, `int128`, `int256`, `float`. Every other target is refused, including going to a narrower type; use `int`'s `wrapTo...` and `to...Checked` methods, or compare and convert in steps. `n to float` is accepted when listed above, and rounds when `n` has more significant bits than the float.

## Equality, ordering and hashing

An `int32` is `eq`, `order`, `hash` and `show`: it compares numerically, works as a map key, a set member and a sort key, and prints in `#( )` strings.

## Related

[`int`](./int.md), [Wide integers](../wide-integers.md), [Operators](../../../reference/operators.md)
