---
title: Arithmetic
description: "+ - * / %, the wrapping forms and **: overflow, truncation and division by zero."
---

`+ - * / %` work on numbers of the same type.

## Overflow stops the program

Integer arithmetic checks every result. When it does not fit the type, the program stops with `arithmetic overflow` instead of wrapping silently. See [int](../../library/core/primitives/int.md) for the ranges.

## Division and remainder

Integer division truncates toward zero and `%` takes the sign of the left operand:

```pelago
fn main() {
    print(-7 / 2, -7 % 2, 7 % -2)
    print(7.5 / 2.0)
}
```

```text
-3 -1 1
3.75
```

Division by zero stops the program.

## Wrapping forms

`+%`, `-%` and `*%` (and `+%=`, `-%=`, `*%=`) discard the carry and wrap around. Use them on purpose, for hashes and checksums:

```pelago
fn main() {
    const big: int = 9223372036854775807
    print(big +% 1, big *% 2)
}
```

```text
-9223372036854775808 -2
```

## Power

`**` is the power operator. The checker accepts it, but the native code generator does not support it yet, so use `pow` (see [math](../../library/core/math/roots.md)) in programs you need to run.

## Related

- [int](../../library/core/primitives/int.md)
- [float](../../library/core/primitives/float.md)
