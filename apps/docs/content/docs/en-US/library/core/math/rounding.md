---
title: Rounding
description: "floor, ceil, round, trunc and fract: how each treats negative numbers and halves, and converting to int."
---

All five take a `float` and give a `float`. A value that is already whole stays as it is, and NaN and infinities pass through.

| Function | Rule | `2.7` | `-2.7` |
| --- | --- | --- | --- |
| `floor(x)` | The largest whole number not above `x`. | 2 | -3 |
| `ceil(x)` | The smallest whole number not below `x`. | 3 | -2 |
| `round(x)` | The nearest whole number; a half goes **away from zero**. | 3 | -3 |
| `trunc(x)` | Drop the fraction. | 2 | -2 |
| `fract(x)` | `x - trunc(x)`, with the sign of `x`. | 0.7 | -0.7 |

```pelago
fn main() {
    print(math.floor(2.7), math.floor(-2.7), math.ceil(2.1), math.ceil(-2.1))
    print(math.round(2.5), math.round(-2.5), math.round(2.4), math.trunc(2.9), math.trunc(-2.9))
    print(math.fract(2.75), math.fract(-2.75), math.fract(3.0))
}
```

```text
2 -3 3 -2
3 -3 2 2 -2
0.75 -0.75 0
```

## To an integer

These return a `float`. To get an `int`, use the methods `truncInt`, `floorInt`, `ceilInt` and `roundInt` on the float; they stop for NaN, infinities and values outside the `int` range. See [float](../primitives/float.md#converting).

## Edge cases

- `round(0.5)` is 1 and `round(1.5)` is 2: halves always go away from zero, not to even.
- Very large floats are already whole: `floor(1e300)` is `1e+300`.

## Related

- [math](./index.md), [float](../primitives/float.md)
