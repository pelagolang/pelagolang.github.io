---
title: Float checks
description: "isNan, isFinite and isInfinite: telling NaN and infinities apart."
---

Floats can be NaN (not a number) or an infinity. NaN is not equal to anything, itself included, so `x == x` is false for a NaN; use these functions instead of comparing.

| Function | True when |
| --- | --- |
| `isNan(x)` | `x` is NaN. |
| `isFinite(x)` | `x` is neither NaN nor an infinity. |
| `isInfinite(x)` | `x` is an infinity, positive or negative. |

```pelago
fn main() {
    const inf = 1.0 / 0.0
    const nan = 0.0 / 0.0
    print(math.isNan(nan), math.isNan(1.0), math.isFinite(1.0), math.isFinite(inf), math.isFinite(nan))
    print(math.isInfinite(inf), math.isInfinite(-inf), math.isInfinite(nan))
}
```

```text
true false true false false
true true false
```

Exactly one of the three is true for any float other than a finite number, where `isFinite` alone is true.

## Related

- [math](./index.md), [float](../primitives/float.md)
