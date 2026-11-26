---
title: gcd and lcm
description: "gcd and lcm for int: signs, zero, and the overflow stop."
---

`gcd(a, b)` is the greatest common divisor and `lcm(a, b)` the least common multiple. Both are never negative.

```pelago
fn main() {
    print(math.gcd(12, 18), math.gcd(-12, 18), math.gcd(0, 5), math.gcd(0, 0))
    print(math.lcm(4, 6), math.lcm(0, 3), math.lcm(-4, 6))
}
```

```text
6 6 5 0
12 0 12
```

- `gcd(0, 0)` is 0 and `gcd(0, n)` is `|n|`.
- `lcm(0, n)` is 0.
- `lcm` stops with `arithmetic overflow` when the result does not fit in an `int`:

```pelago exit
fn main() {
    print(math.lcm(9223372036854775807, 2))
}
```

```text
core.math:124: stopped: arithmetic overflow
```

## Related

- [math](./index.md), [int](../primitives/int.md)
