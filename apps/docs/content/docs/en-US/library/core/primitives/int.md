---
title: int
description: "The 64-bit signed integer: literals, checked arithmetic, wrapping, saturating and checked methods, narrowing, parsing and edge cases."
---

`int` is the default whole-number type: a 64-bit two's complement signed integer, from `-9223372036854775808` to `9223372036854775807`. Every other integer type follows the same rules with a different range: `int8`, `int16`, `int32`, `int64`, `uint` (an unsigned machine integer), `uint8` (also called `byte`), `uint16`, `uint32`, `uint64`, and the wide `int128`, `uint128`, `int256` and `uint256` in [Wide integers](../wide-integers.md).

## Writing a value

| Form | Example |
| --- | --- |
| Decimal | `42`, `1_000_000` |
| Hexadecimal | `0x1F` |
| Binary | `0b101` |
| Octal | `0o17` |

Underscores may separate digits. A literal takes the integer type the context asks for (`const b: uint8 = 200`), and is an `int` otherwise. A literal that does not fit its type is an error at compile time. `int` has no `MIN` or `MAX` constant yet; write the literal, and note that `-9223372036854775808` is spelled `-9223372036854775807 - 1`.

## Arithmetic

`+ - * / %`, unary `-`, `++`, `--` and the `op=` forms. **Every result is checked**: one that does not fit stops the program with `stopped: arithmetic overflow` and the source line. That includes unary minus and `abs` of the smallest value.

| Operator | Result | Edge |
| --- | --- | --- |
| `a / b` | Truncates toward zero. `-7 / 2` is `-3`. | `b == 0` stops with `stopped: division by zero`. |
| `a % b` | Remainder with the sign of `a`. `-7 % 3` is `-1`. | `b == 0` stops with `stopped: division by zero`. |
| `a +% b`, `a -% b`, `a *% b` | Two's complement wrapping. | Never stops. For hashes and checksums. |
| `a << n`, `a >> n` | Shift. `>>` is arithmetic on signed types. | `n` equal to or above the width stops with `stopped: shifted by the width or more`. |
| `a & b`, `a \| b`, `a ^ b`, `~a` | Bitwise. | |

```pelago
fn main() {
    const big: int = 9223372036854775807
    print("#(big +% 1)")
    print("#(-7 / 2) #(-7 % 3) #(7 % -3)")
    print("#(1 << 3) #(-8 >> 1) #(5 & 3) #(5 | 3) #(5 ^ 3) #(~5)")
}
```

```text
-9223372036854775808
-3 -1 1
8 -4 1 7 6 -6
```

An overflowing addition stops the program rather than returning a wrong number:

```pelago exit
fn main() {
    var x: int = 9223372036854775807
    x += 1
    print("not reached")
}
```

```text
arithmetic overflow
```

### Known gap

`-9223372036854775808 / -1` does not stop the program; it yields `-9223372036854775808` on every backend. All other overflows are caught.

## Methods

| Method | Result | Behaviour |
| --- | --- | --- |
| `abs()` | `int` | Absolute value. Overflow stops the program for the smallest value. |
| `min(o)`, `max(o)` | `int` | The smaller or larger of two. |
| `pow(e)` | `int` | `self` multiplied `e` times. Overflow stops the program (`3.pow(40)` does). An exponent of zero or less gives `1`: negative exponents are not supported and are not reported. |
| `checkedAdd(o)`, `checkedSub(o)`, `checkedMul(o)` | `int?` | `none` on overflow instead of stopping. |
| `wrappingAdd(o)`, `wrappingSub(o)`, `wrappingMul(o)` | `int` | The same as `+%`, `-%`, `*%`. |
| `saturatingAdd(o)`, `saturatingSub(o)` | `int` | Stop at the largest or smallest value instead of overflowing. |
| `iter()` | `iter<int>` | Defined on a range such as `0..5`, not on `int`. |

```pelago
fn main() {
    const x = 250
    print("#(x.checkedMul(x) ?? -1) #((-9223372036854775807).saturatingSub(10)) #(3.pow(4))")
    const m = 9223372036854775807
    print("#(m.checkedAdd(1) ?? 0) #(m.saturatingAdd(5)) #(m.wrappingAdd(1))")
    print("#((-5).abs()) #(3.max(9)) #(3.min(9))")
}
```

```text
62500 -9223372036854775808 81
0 9223372036854775807 -9223372036854775808
5 9 3
```

## Narrowing to smaller integers

`to` converts when no value can be lost: to the same or a wider integer of the same signedness, or unsigned to a wider signed type. Going down needs a named method, because the loss is the point.

| Method | Result | Behaviour |
| --- | --- | --- |
| `wrapToByte()` | `uint8` | Keeps the low 8 bits: `300` becomes `44`, `-1` becomes `255`. |
| `toByteChecked()` | `uint8?` | `none` unless the value is 0 to 255. |
| `wrapToInt8()`, `toInt8Checked()` | `int8`, `int8?` | Range -128 to 127. |
| `wrapToInt16()`, `toInt16Checked()` | `int16`, `int16?` | Range -32768 to 32767. |
| `wrapToUint16()`, `toUint16Checked()` | `uint16`, `uint16?` | Range 0 to 65535. |
| `wrapToInt32()`, `toInt32Checked()` | `int32`, `int32?` | Range -2^31 to 2^31 - 1. |
| `wrapToUint32()`, `toUint32Checked()` | `uint32`, `uint32?` | Range 0 to 2^32 - 1. |

```pelago
fn main() {
    print("#(300.wrapToByte()) #(250.toByteChecked() ?? 0) #(300.toByteChecked() ?? 0)")
    print("#(40000.wrapToInt16()) #(40000.toInt16Checked() ?? 0)")
    const small: int8 = 5
    const widened: int = small to int
    print("#widened")
}
```

```text
44 250 0
-25536 0
5
```

## Converting to and from other types

| From | To | How |
| --- | --- | --- |
| `int` | `float` | `n to float`. Above 2^53 the result is rounded. |
| `int` | `int128` and wider | `n to int128`. |
| `int8` ... `int32`, `uint8` ... `uint32` | `int` | `x to int`. |
| `int` | `int8` ... `uint32` | `wrapTo...` or `to...Checked`, above. `n to int16` is refused. |
| `float` | `int` | `truncInt`, `floorInt`, `ceilInt`, `roundInt` on the float. |
| `char` | `int` | `c to int` is the code point. |
| `bool` | `int` | `flag to int` is 0 or 1. |
| text | `int` | `"42".parseInt()` returns `int ! parse_error`. |
| `int` | text | `"#n"` or `print(n)`. |

```pelago
fn main() {
    switch "42".parseInt() {
        case ok(v): print("#v")
        case err(e): print(e)
    }
    switch "4x".parseInt() {
        case ok(v): print("#v")
        case err(e): print(e)
    }
    switch "99999999999999999999".parseInt() {
        case ok(v): print("#v")
        case err(e): print(e)
    }
}
```

```text
42
bad digit at position 1
the number is too large
```

## Narrow integer types

The narrower types check their own range: `const a: int8 = 100` plus another `100` stops with `arithmetic overflow`, and `uint` or `byte` arithmetic stops when a result would go below zero (`5 - 6` as `uint`). Unary minus on an unsigned type is a compile error (``cannot negate `uint8` ``).

## Equality, ordering and hashing

`==`, `!=`, `<` and the rest compare numerically. An integer is `eq`, `order`, `hash` and `show`, so it works as a map key, a set member, a sort key and in a `#( )` string.

## Not finished

- `**` is accepted by the checker and not lowered: use `pow`.
- `pow` has no negative exponent and no overflow-reporting form; use `checkedMul` in a loop where you need `none`.
- `MIN` and `MAX` constants, `toString` with a radix, and `divEuclid`-style helpers.
- The `-9223372036854775808 / -1` gap above.

## Related

- [Wide integers](../wide-integers.md), [`float`](./float.md), [`char`](./char.md)
- [Math](../math.md): `math.min`, `math.clamp`, `math.gcd`, `math.isqrt`.
- [Operators](../../../reference/operators.md)
