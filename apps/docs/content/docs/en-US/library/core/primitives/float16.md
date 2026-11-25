---
title: float16
description: "The 16-bit IEEE 754 floating point type: precision, range, arithmetic, conversions and text form."
---

`float16` is a 16-bit binary floating point number: 5 exponent bits and 11 significand bits (including the implicit one), about 3 digits, largest value 65504. It is the standard IEEE 754 binary16 format, written in Pelago itself with no hardware support and no C library, so it works on every target the compiler builds for: round to nearest even, subnormals, infinities, NaN and signed zero.

## Writing a value

Float literals such as `1.0`, `2.5e-1` or `1e3`, given the type by context: `const a: float16 = 0.1`. A literal is rounded once, correctly, to this type when the program is compiled.

## Arithmetic

`+ - * / %`, unary `-` and the comparisons work on two `float16` values. **Floats never stop the program on overflow**: you get `inf`, `-inf` or `nan` as IEEE 754 says (integer overflow still stops). A comparison with `nan` is false, except `!=`. `0.0 == -0.0` is true.

```pelago
fn main() {
    const a: float16 = 1.0
    const b: float16 = 3.0
    print(a / b, a + b, a - b, a * b, b % 2.0, -a)
    var c: float16 = 0.1
    c += 0.2
    print(c, c == 0.3, c > 0.3)
    const z: float16 = 0.0
    print(a / z, -a / z, z / z)
}
```

```text
0.3333 4 -2 3 1 -1
0.2998 false false
inf -inf nan
```

## Methods

| Method | Result | Behaviour |
| --- | --- | --- |
| `sqrt()` | `float16` | Correctly rounded. NaN for a negative number. |
| `floor()`, `ceil()`, `trunc()` | `float16` | Whole number below, above, or toward zero. |
| `round()` | `float16` | Nearest whole number, halves away from zero, like `float`. |
| `abs()` | `float16` | The magnitude. |
| `min(o)`, `max(o)` | `float16` | The smaller or larger. |
| `toFloat()` | `float` | Narrow to a plain `float`, rounding to nearest even. |

```pelago
fn main() {
    const y: float16 = -2.5
    print(y.floor(), y.ceil(), y.trunc(), y.round(), y.abs())
    const x: float16 = 2.0
    print(x.min(y), x.max(y), x.sqrt())
    print(y.toFloat())
}
```

```text
-3 -2 -2 -3 2.5
-2.5 2 1.414
-2.5
```

## Parsing

`str.parseFloat16()` reads decimal text exactly (correctly rounded) and returns `float16 ! parse_error`.

```pelago
fn main() {
    print("2.5".parseFloat16())
    print("1e5".parseFloat16())
    print("x".parseFloat16())
}
```

```text
ok(2.5)
ok(inf)
err(not a number)
```

## Text form

Printing gives the **shortest text that reads back as the same value**, so `0.1` prints `0.1`, a huge magnitude uses exponent form, and the special values print as `inf`, `-inf` and `nan`. This is unlike [`float`](./float.md#text-form), whose text form is limited.

## Converting

`to` widens when nothing is lost. Into `float16`, `to` is accepted from: `int8`, `int16`, `int32`, `int64`, `int`, `uint8`, `uint16`, `uint32`, `uint64`, `uint`, `int128`, `uint128`, `int256`, `uint256`. From `float16`, `to` is accepted for: `float`, `float32`, `float128`, `float256`. Everything else is refused.

## Equality and ordering

`float16` is `eq`, `order` and `show`. Because of NaN, sorting a list containing NaN is not meaningful.

## Not finished

- `pow` with a float exponent, `exp`, `log`, the trigonometric functions and a fused multiply-add.
- Narrowing with `to` to a smaller float.
- Speed: plain loops, correct first.

## Related

[`float`](./float.md), [Wide and narrow floats overview](../wide-floats.md), [Wide integers](../wide-integers.md)
