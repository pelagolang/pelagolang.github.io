---
title: min, max, clamp, abs and signum
description: "Choosing and limiting values: min, max and clamp for any ordered type, abs and signum for signed numbers, with the overflow and bad-range stops."
---

## min and max

`min(a, b)` and `max(a, b)` work on two values of the same ordered type: `int`, `float`, text, the wide numbers, and any type with [`order`](../interfaces/order.md).

```pelago
fn main() {
    print(math.min(3, 7), math.max(3, 7), math.min(2.5, 1.5), math.max("a", "b"))
}
```

```text
3 7 1.5 b
```

## clamp

`clamp(x, lo, hi)` holds `x` between `lo` and `hi`.

```pelago
fn main() {
    print(math.clamp(15, 0, 10), math.clamp(-5, 0, 10), math.clamp(5, 0, 10), math.clamp(2.5, 0.0, 1.0))
}
```

```text
10 0 5 1
```

`lo` must not be above `hi`; otherwise the program stops:

```pelago exit
fn main() {
    print(math.clamp(1, 5, 0))
}
```

```text
clamp: lo is above hi
core.math:49: stopped: panic
```

## abs and signum

`abs(x)` is the distance from zero and `signum(x)` is -1, 0 or 1. They work on `int`, `float` and the wide signed numbers.

```pelago
fn main() {
    print(math.abs(-5), math.abs(-2.5), math.signum(-9), math.signum(0), math.signum(3.5), math.signum(-0.5))
}
```

```text
5 2.5 -1 0 1 -1
```

The lowest `int` has no positive counterpart, so `abs` of it stops with `arithmetic overflow`:

```pelago exit
fn main() {
    const m = -9223372036854775807 - 1
    print(math.abs(m))
}
```

```text
core.numbers:92: stopped: arithmetic overflow
```

## Edge cases

- With floats, `min(-0.0, 0.0)` gives `-0`, and a NaN argument follows the comparison rules: comparisons with NaN are false.
- `abs` and `signum` of a `float` never stop the program.

## Related

- [math](./index.md), [order](../interfaces/order.md), [int](../primitives/int.md)
