---
title: float
description: "The 64-bit IEEE 754 number: literals, arithmetic, NaN and infinity, rounding, conversion to int and text form."
---

`float` is a 64-bit IEEE 754 binary floating point number (binary64). `float32` is the 32-bit form. The other formats, `float16`, `float128` and `float256`, are described in [Wide and narrow floats](../wide-floats.md).

## Writing a value

`3.14`, `2.5e-1`, `1e3` and `100.0` are `float` literals. A digit must follow the `.`: `3.` is not a number, and `2.pow(8)` calls a method on an integer. An integer literal never turns into a `float` by itself.

```pelago
fn main() {
    const a = 0.5
    const b: float = 2.0
    print("#(a + b) #(a * b) #(b / 4.0) #(b - 3.0)")
}
```

```text
2.5 1 0.5 -1
```

## Operators

`+`, `-`, `*`, `/`, unary `-`, and the comparisons `==`, `!=`, `<`, `>`, `<=`, `>=` work on floats, and so do the `op=` forms. Operands must both be `float`: `1 + 0.5` is a type error. Unlike integers, **float arithmetic never stops the program**: overflow gives an infinity, `0.0 / 0.0` gives NaN, and `1.0 / 0.0` gives an infinity.

`%`, the bit operators and the `%` wrapping forms are for integers. `**` is accepted by the checker but not lowered yet: use `pow`.

### NaN and signed zero

- A NaN is unequal to everything, itself included: `n == n` is `false` and `n != n` is `true`. Every ordering comparison with a NaN is `false`.
- `0.0 == -0.0` is `true`, although `1.0 / -0.0` is negative infinity.
- `x != x` tests for NaN; `math.isNan(x)`, `math.isFinite(x)` and `math.isInfinite(x)` say it by name.

```pelago
fn main() {
    const zero = 0.0
    const nan = zero / zero
    print("#(nan == nan) #(nan != nan) #(nan < 1.0) #(nan > 1.0)")
    print("#(0.0 == -0.0) #(0.1 + 0.2)")
}
```

```text
false true false false
true 0.3
```

## Methods

| Method | Result | Behaviour |
| --- | --- | --- |
| `abs()` | `float` | The magnitude. |
| `min(o)`, `max(o)` | `float` | The smaller or larger. Written as a comparison, so with a NaN, `nan.max(1.0)` is `1` and `1.0.max(nan)` is NaN: the NaN does not win consistently. |
| `sqrt()` | `float` | Correctly rounded (`sqrtsd` on x86-64, `fsqrt` on AArch64). NaN for a negative number. |
| `floor()` | `float` | The largest whole number not above `self`. Exact for every float; NaN and infinities stay as they are. |
| `ceil()` | `float` | The smallest whole number not below `self`. |
| `round()` | `float` | The nearest whole number; a half goes away from zero (`2.5` to `3`, `-2.5` to `-3`). |
| `pow(e)` | `float` | `self` to a **whole-number** exponent. Any other exponent stops the program with `pow: only whole exponents are supported`. A negative exponent gives `1 / self.pow(-e)`. |
| `fma(b, c)` | `float` | `self * b + c` rounded once, not twice. The same result on every target and in the interpreter. Plain `a * b + c` is never fused. |
| `truncInt()` | `int` | Toward zero. Stops the program when the value is NaN or does not fit an `int`. |
| `floorInt()`, `ceilInt()`, `roundInt()` | `int` | The same, after `floor`, `ceil` or `round`. |

```pelago
fn main() {
    const r = 2.5
    print("#(r.floor()) #(r.ceil()) #(r.round()) #((-r).round())")
    print("#(r.floorInt()) #(r.ceilInt()) #(r.roundInt()) #((-3.9).truncInt())")
    print("#(16.0.sqrt()) #(2.0.pow(10.0)) #(2.0.pow(-2.0)) #(1.5.fma(2.0, 0.5))")
}
```

```text
2 3 3 -3
2 3 3 -3
4 1024 0.25 3.5
```

## Converting

| From | To | How |
| --- | --- | --- |
| `int` | `float` | `n to float`. Allowed; an integer above 2^53 is rounded to the nearest float. |
| `float` | `int` | Not allowed with `to`: it can lose information. Name the rounding: `truncInt`, `floorInt`, `ceilInt` or `roundInt`. |
| `float32` | `float` | `x to float`, exact. |
| `float` | `float32` | Not allowed with `to`. |
| text | `float` | `"2.5".parseFloat()` returns `float ! parse_error`. |
| `float` | text | `"#x"` or `print(x)`. See below. |

```pelago
fn main() {
    const n = 7
    print("#(n to float / 2.0)")
    switch "-2.5e1".parseFloat() {
        case ok(v): print("#v")
        case err(e): print(e)
    }
    switch "abc".parseFloat() {
        case ok(v): print("#v")
        case err(e): print(e)
    }
}
```

```text
3.5
-25
bad number
```

## Text form

A float prints as the **shortest text that reads back as the same value**: `3.14`, `100`, `0.1`, and `0.30000000000000004` for the sum `0.1 + 0.2`. There are no trailing zeros, and a whole number has no point (`100`, not `100.0`).

- Plain digits are used while the decimal exponent is between -7 and 20: `1000000000000000`, `100000000000000000000`, `0.00001`, `0.0001`. Outside that range the text uses exponent form: `1e+21`, `1.7976931348623157e+308`, `1e-7`, `5e-324`.
- Infinity prints as `inf` or `-inf`, NaN as `nan`, and negative zero as `-0`.
- Every finite value survives `print` followed by `parseFloat`, so the text is safe to store.

```pelago
fn main() {
    print(0.1 + 0.2, 1e20, 1e21, 1e-6, 1e-7, -0.0)
    print(1.0 / 0.0, -1.0 / 0.0, 0.0 / 0.0)
}
```

```text
0.30000000000000004 100000000000000000000 1e+21 1e-6 1e-7 -0
inf -inf nan
```

## Edge cases

- `truncInt` and its relatives stop with `float does not fit an int` for NaN, infinities and anything of magnitude 2^63 or more.
- `pow` works by repeated multiplication, so a large exponent is slow and the result can accumulate rounding.
- Float arithmetic is the same on every backend and in the interpreter: no fused multiply-add happens unless you call `fma`.
- A `float` is `eq`, `order` and `show`, but because of NaN, sorting a list that contains a NaN is not meaningful.

## Not finished

- `**` on floats is accepted by the checker but not lowered.
- No `sin`, `cos`, `exp`, `ln` and the like yet in `core`; see [Math](../math/index.md) for what exists.

## Related

- [Wide and narrow floats](../wide-floats.md): `float16`, `float32`, `float128`, `float256`.
- [`int`](./int.md), [Math](../math/index.md)
