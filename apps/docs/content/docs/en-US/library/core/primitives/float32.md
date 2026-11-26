---
title: float32
description: "The 32-bit IEEE 754 floating point type: precision, range, arithmetic, conversions and text form."
---

`float32` is a 32-bit binary floating point number: 8 exponent bits and 24 significand bits (including the implicit one), about 7 digits, largest value about 3.4e38. It is the standard IEEE 754 binary32 format, computed in hardware.

## Writing a value

Float literals such as `1.0`, `2.5e-1` or `1e3`, given the type by context: `const a: float32 = 0.1`. A literal is rounded once, correctly, to this type when the program is compiled.

## Arithmetic

`+ - * / %`, unary `-` and the comparisons work on two `float32` values. **Floats never stop the program on overflow**: you get `inf`, `-inf` or `nan` as IEEE 754 says (integer overflow still stops). A comparison with `nan` is false, except `!=`. `0.0 == -0.0` is true.

```pelago
fn main() {
    const a: float32 = 0.1
    const b: float32 = 3.0
    print("#(a + b) #(a * b) #(b / 7.0) #(a == 0.1)")
    const c: float32 = 16777216.0
    print("#(c + 1.0)")
    print("#(a to float) #(a < b)")
}
```

```text
3.1 0.3 0.42857143 true
16777216
0.10000000149011612 true
```

## Methods

`float32` has no methods of its own yet: no `sqrt`, `floor`, `abs` or `min`. Convert to [`float`](./float.md) with `x to float` for those; the conversion is exact. Going back, `float` to `float32`, is not allowed with `to` because it loses precision.

## Text form

A `float32` prints the shortest text that reads back as the same `float32`, in the same forms as [`float`](./float.md#text-form): `0.1` stays `0.1` (not the digits of the widened value; `a to float` is a `float` and does show the value that is really stored, `0.10000000149011612`), large and small values use exponent form, and infinities and NaN print as `inf`, `-inf` and `nan`.

## Converting

`to` widens when nothing is lost. Into `float32`, `to` is accepted from: `int8`, `int16`, `int32`, `int64`, `int`, `uint8`, `uint16`, `uint32`, `uint64`, `uint`, `int128`, `uint128`, `int256`, `uint256`. From `float32`, `to` is accepted for: `float`, `float128`, `float256`. Everything else is refused.

## Equality and ordering

`float32` is `eq`, `order` and `show`. Because of NaN, sorting a list containing NaN is not meaningful.

## Not finished

- The method set: `sqrt`, `floor` and the rest.
- Narrowing with `to` to a smaller float.


## Related

[`float`](./float.md), [Wide and narrow floats overview](../wide-floats.md), [Wide integers](../wide-integers.md)
