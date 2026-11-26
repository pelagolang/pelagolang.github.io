---
title: float128
description: "The 128-bit IEEE 754 floating point type: precision, range, arithmetic, conversions and text form."
---

`float128` is a 128-bit binary floating point number: 15 exponent bits and 113 significand bits (including the implicit one), about 34 digits, largest value about 1.2e4932. It is the standard IEEE 754 binary128 format, written in Pelago itself with no hardware support and no C library, so it works on every target the compiler builds for: round to nearest even, subnormals, infinities, NaN and signed zero.

## Writing a value

Float literals such as `1.0`, `2.5e-1` or `1e3`, given the type by context: `const a: float128 = 0.1`. A literal is rounded once, correctly, to this type when the program is compiled.

## Arithmetic

`+ - * / %`, unary `-` and the comparisons work on two `float128` values. **Floats never stop the program on overflow**: you get `inf`, `-inf` or `nan` as IEEE 754 says (integer overflow still stops). A comparison with `nan` is false, except `!=`. `0.0 == -0.0` is true.

```pelago
fn main() {
    const a: float128 = 1.0
    const b: float128 = 3.0
    print(a / b, a + b, a - b, a * b, b % 2.0, -a)
    var c: float128 = 0.1
    c += 0.2
    print(c, c == 0.3, c > 0.3)
    const z: float128 = 0.0
    print(a / z, -a / z, z / z)
}
```

```text
0.3333333333333333333333333333333333 4 -2 3 1 -1
0.30000000000000000000000000000000004 false true
inf -inf nan
```

## Methods

| Method | Result | Behaviour |
| --- | --- | --- |
| `sqrt()` | `float128` | Correctly rounded. NaN for a negative number. |
| `floor()`, `ceil()`, `trunc()` | `float128` | Whole number below, above, or toward zero. |
| `round()` | `float128` | Nearest whole number, halves away from zero, like `float`. |
| `abs()` | `float128` | The magnitude. |
| `min(o)`, `max(o)` | `float128` | The smaller or larger. |
| `toFloat()` | `float` | Narrow to a plain `float`, rounding to nearest even. |

```pelago
fn main() {
    const y: float128 = -2.5
    print(y.floor(), y.ceil(), y.trunc(), y.round(), y.abs())
    const x: float128 = 2.0
    print(x.min(y), x.max(y), x.sqrt())
    print(y.toFloat())
}
```

```text
-3 -2 -2 -3 2.5
-2.5 2 1.414213562373095048801688724209698
-2.5
```

## Parsing

`str.parseFloat128()` reads decimal text exactly (correctly rounded) and returns `float128 ! parse_error`.

```pelago
fn main() {
    print("2.5".parseFloat128())
    print("1e5".parseFloat128())
    print("x".parseFloat128())
}
```

```text
ok(2.5)
ok(100000)
err(not a number)
```

## Text form

Printing gives the **shortest text that reads back as the same value**, so `0.1` prints `0.1`, a huge magnitude uses exponent form, and the special values print as `inf`, `-inf` and `nan`. This is unlike [`float`](./float.md#text-form), whose text form is limited.

## Converting

`to` widens when nothing is lost. Into `float128`, `to` is accepted from: `int8`, `int16`, `int32`, `int64`, `int`, `uint8`, `uint16`, `uint32`, `uint64`, `uint`, `int128`, `uint128`, `int256`, `uint256`. From `float128`, `to` is accepted for: `float256`. Everything else is refused.

## Equality and ordering

`float128` is `eq`, `order` and `show`. Because of NaN, sorting a list containing NaN is not meaningful.

## Not finished

- `pow` with a float exponent, `exp`, `log`, the trigonometric functions and a fused multiply-add.
- Narrowing with `to` to a smaller float.
- Speed: plain loops, correct first.

## Related

[`float`](./float.md), [Wide and narrow floats overview](../wide-floats.md), [Wide integers](../wide-integers.md)
