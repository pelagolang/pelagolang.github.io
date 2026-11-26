---
title: Roots and powers
description: "sqrt, pow, powInt, hypot, fma and isqrt: exactness, which exponents are supported, and what stops the program."
---

## sqrt

`sqrt(x)` is correctly rounded: the result is the float nearest to the true square root, on every target. A negative number gives NaN, and an infinity gives an infinity.

```pelago
fn main() {
    print(math.sqrt(2.0), math.sqrt(16.0), math.sqrt(-1.0), math.sqrt(0.0), math.sqrt(1.0 / 0.0))
}
```

```text
1.4142135623730951 4 nan 0 inf
```

## pow

`pow(x, e)` raises a float to a power. **The exponent must be a whole number** (positive, zero or negative); a fraction stops the program:

```pelago
fn main() {
    print(math.pow(2.0, 10.0), math.pow(2.0, -1.0), math.pow(0.0, 0.0), math.pow(-2.0, 3.0))
    print(math.pow(2.0, 1024.0), math.pow(0.5, 2000.0))
}
```

```text
1024 0.5 1 -8
inf 0
```

```pelago exit
fn main() {
    print(math.pow(2.0, 0.5))
}
```

```text
pow: only whole exponents are supported
core.numbers:191: stopped: panic
```

It multiplies repeatedly, so a very large exponent takes time and the result can accumulate rounding. For a square root use `sqrt`. There is no general real-exponent power yet.

## powInt

`powInt(x, n)` is the integer power. It stops with `arithmetic overflow` when the result does not fit, and stops when `n` is negative:

```pelago
fn main() {
    print(math.powInt(2, 10), math.powInt(-3, 3), math.powInt(5, 0), math.powInt(0, 0))
}
```

```text
1024 -27 1 1
```

```pelago exit
fn main() {
    print(math.powInt(2, -1))
}
```

```text
powInt: negative exponent
core.math:85: stopped: panic
```

```pelago exit
fn main() {
    print(math.powInt(2, 64))
}
```

```text
core.numbers:100: stopped: arithmetic overflow
```

## hypot

`hypot(x, y)` is `sqrt(x * x + y * y)`, scaled so a large `x` or `y` does not overflow early.

```pelago
fn main() {
    print(math.hypot(3.0, 4.0), math.hypot(1e200, 1e200), math.hypot(0.0, 0.0))
}
```

```text
5 1.414213562373095e+200 0
```

## fma

`fma(a, b, c)` is `a * b + c` rounded **once**, which can be more accurate than writing the multiplication and addition separately. No fused multiply-add happens unless you call `fma`.

## isqrt

`isqrt(n)` is the whole part of the square root of an `int`, exact for every `int`. A negative `n` stops the program with `isqrt: negative number`.

```pelago
fn main() {
    print(math.fma(2.0, 3.0, 4.0), math.isqrt(99), math.isqrt(100), math.isqrt(0), math.isqrt(9223372036854775807))
}
```

```text
10 9 10 0 3037000499
```

```pelago exit
fn main() {
    print(math.isqrt(-4))
}
```

```text
isqrt: negative number
core.math:129: stopped: panic
```

## Related

- [math](./index.md), [float](../primitives/float.md), [int](../primitives/int.md)
