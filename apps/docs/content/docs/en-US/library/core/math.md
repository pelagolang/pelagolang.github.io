---
title: Math
description: "The math namespace: min, max, clamp, sqrt, rounding, gcd, constants and float checks, always in scope."
---

`math` is a namespace that is always in scope, with no import: `math.sqrt(x)`, `math.min(a, b)`, `math.pi`. The same operations stay available as methods (`x.sqrt()`, `a.min(b)`, see [int](./primitives/int.md) and [float](./primitives/float.md)); both spellings call the same code.

```pelago
fn main() {
    print(math.sqrt(2.0), math.round(2.5), math.min(3, 7), math.clamp(15, 0, 10))
    print(math.gcd(12, 18), math.hypot(3.0, 4.0))
}
```

```text
1.4142135623730951 3 3 10
6 5
```

## Rules

- Whole-number arithmetic stops the program on overflow, like `+` does. The `checked`, `wrapping` and `saturating` forms are methods on the integers.
- Float functions follow IEEE 754: a NaN or infinity going in gives a NaN or infinity coming out.
- `sqrt`, `floor`, `ceil` and `fma` are correctly rounded on every target and in the interpreter.
- No `libc`: everything is written in Pelago.

## Constants

| Name | Value |
| --- | --- |
| `math.pi` | 3.141592653589793 |
| `math.tau` | `2 * pi` |
| `math.e` | 2.718281828459045 |

## Functions

| Function | What it does |
| --- | --- |
| `min(a, b)`, `max(a, b)` | Smaller or larger of two values of any ordered type (`int`, `float`, the wide numbers). |
| `clamp(x, lo, hi)` | `x` held between `lo` and `hi`; stops when `lo > hi`. |
| `abs(x)`, `signum(x)` | For `int`, `float` and the wide numbers. `abs` stops on the lowest `int`. |
| `sqrt(x)` | Correctly rounded; a negative number gives NaN. |
| `floor(x)`, `ceil(x)`, `round(x)`, `trunc(x)` | Whole-number rounding; `round` sends a half away from zero. |
| `fract(x)` | `x - trunc(x)`, with the sign of `x`. |
| `fma(a, b, c)` | `a * b + c`, rounded once. |
| `pow(x, e)` | Float power. |
| `powInt(x, n)` | Integer power; stops on overflow or when `n` is below zero. |
| `hypot(x, y)` | `sqrt(x * x + y * y)` without early overflow. |
| `isNan(x)`, `isFinite(x)`, `isInfinite(x)` | Float checks. |
| `gcd(a, b)`, `lcm(a, b)` | Never negative; `gcd(0, 0)` is 0, `lcm(0, n)` is 0, `lcm` stops on overflow. |
| `isqrt(n)` | Whole part of the square root; stops when `n` is negative. |

Integers beyond the machine's size are in [`std.big`](../std/math/big.md).
