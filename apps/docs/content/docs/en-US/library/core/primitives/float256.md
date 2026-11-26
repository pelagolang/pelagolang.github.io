---
title: float256
description: "The 256-bit IEEE 754 floating point type: precision, range, arithmetic, conversions and text form."
---

`float256` is a 256-bit binary floating point number: 19 exponent bits and 237 significand bits (including the implicit one), about 71 digits. It is the standard IEEE 754 binary256 format, written in Pelago itself with no hardware support and no C library, so it works on every target the compiler builds for: round to nearest even, subnormals, infinities, NaN and signed zero.

## Writing a value

Float literals such as `1.0`, `2.5e-1` or `1e3`, given the type by context: `const a: float256 = 0.1`. A literal is rounded once, correctly, to this type when the program is compiled.

## Arithmetic

`+ - * / %`, unary `-` and the comparisons work on two `float256` values. **Floats never stop the program on overflow**: you get `inf`, `-inf` or `nan` as IEEE 754 says (integer overflow still stops). A comparison with `nan` is false, except `!=`. `0.0 == -0.0` is true.

```pelago
fn main() {
    const a: float256 = 1.0
    const b: float256 = 3.0
    print(a / b, a + b, a - b, a * b, b % 2.0, -a)
    var c: float256 = 0.1
    c += 0.2
    print(c, c == 0.3, c > 0.3)
    const z: float256 = 0.0
    print(a / z, -a / z, z / z)
}
```

```text
0.333333333333333333333333333333333333333333333333333333333333333333333333 4 -2 3 1 -1
0.300000000000000000000000000000000000000000000000000000000000000000000002 false true
inf -inf nan
```

## Methods

| Method | Result | Behaviour |
| --- | --- | --- |
| `sqrt()` | `float256` | Correctly rounded. NaN for a negative number. |
| `floor()`, `ceil()`, `trunc()` | `float256` | Whole number below, above, or toward zero. |
| `round()` | `float256` | Nearest whole number, halves away from zero, like `float`. |
| `abs()` | `float256` | The magnitude. |
| `min(o)`, `max(o)` | `float256` | The smaller or larger. |
| `toFloat()` | `float` | Narrow to a plain `float`, rounding to nearest even. |

```pelago
fn main() {
    const y: float256 = -2.5
    print(y.floor(), y.ceil(), y.trunc(), y.round(), y.abs())
    const x: float256 = 2.0
    print(x.min(y), x.max(y), x.sqrt())
    print(y.toFloat())
}
```

```text
-3 -2 -2 -3 2.5
-2.5 2 1.41421356237309504880168872420969807856967187537694807317667973799073247
-2.5
```

## Parsing

`str.parseFloat256()` reads decimal text exactly (correctly rounded) and returns `float256 ! parse_error`.

```pelago
fn main() {
    print("2.5".parseFloat256())
    print("1e5".parseFloat256())
    print("x".parseFloat256())
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

`to` widens when nothing is lost. Into `float256`, `to` is accepted from: `int8`, `int16`, `int32`, `int64`, `int`, `uint8`, `uint16`, `uint32`, `uint64`, `uint`, `int128`, `uint128`, `int256`, `uint256`. From `float256`, `to` is accepted for: no other type. Everything else is refused.

## Equality and ordering

`float256` is `eq`, `order` and `show`. Because of NaN, sorting a list containing NaN is not meaningful.

## Not finished

- `pow` with a float exponent, `exp`, `log`, the trigonometric functions and a fused multiply-add.
- Narrowing with `to` to a smaller float.
- Speed: plain loops, correct first.

## Related

[`float`](./float.md), [Wide and narrow floats overview](../wide-floats.md), [Wide integers](../wide-integers.md)
