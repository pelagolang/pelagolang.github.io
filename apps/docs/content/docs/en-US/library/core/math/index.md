---
title: math
description: "The math namespace: always in scope, one page for each group of functions, with the rules for overflow, NaN and infinity."
---

`math` is a namespace that is always in scope, with no import: `math.sqrt(x)`, `math.min(a, b)`, `math.pi`. The same operations stay available as methods (`x.sqrt()`, `a.min(b)`, see [int](../primitives/int.md) and [float](../primitives/float.md)); both spellings call the same code.

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

## Groups

| Group | Contents | Page |
| --- | --- | --- |
| Constants | `pi`, `tau`, `e` | [Constants](./constants.md) |
| Comparing | `min`, `max`, `clamp`, `abs`, `signum` | [min, max, clamp, abs and signum](./minmax.md) |
| Rounding | `floor`, `ceil`, `round`, `trunc`, `fract` | [Rounding](./rounding.md) |
| Roots and powers | `sqrt`, `pow`, `powInt`, `hypot`, `fma`, `isqrt` | [Roots and powers](./roots.md) |
| Float checks | `isNan`, `isFinite`, `isInfinite` | [Float checks](./checks.md) |
| Number theory | `gcd`, `lcm` | [gcd and lcm](./numbertheory.md) |

## Rules for every function

- Whole-number arithmetic stops the program on overflow, like `+` does. The `checked`, `wrapping` and `saturating` forms are methods on the integers; see [int](../primitives/int.md).
- Float functions follow IEEE 754: a NaN or infinity going in gives a NaN or infinity coming out, and they never stop the program for that reason.
- `sqrt`, `floor`, `ceil` and `fma` are correctly rounded on every target and in the interpreter.
- There is no `libc`: everything is written in Pelago.

## Not available yet

There are no `sin`, `cos`, `tan`, `exp`, `ln` or `log` in `core`, and `pow` takes whole exponents only (see [Roots and powers](./roots.md)). Integers beyond the machine's size are in [`std.big`](../../std/math/big.md).

## Related

- [int](../primitives/int.md), [float](../primitives/float.md), [Wide integers](../wide-integers.md)
