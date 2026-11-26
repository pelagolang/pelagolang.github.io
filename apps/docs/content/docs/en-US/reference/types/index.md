---
title: Types
description: "Every built-in type, how types are written, and where each has its own page."
---

Every built-in type has a page in the [core library](../../library/core/index.md). This chapter says how types are written and how they fit together.

| Type | Page |
| --- | --- |
| `int`, `uint`, `int8` to `int64`, `uint8` to `uint64`, `byte`, wide integers | [Numbers](./numbers.md), [int](../../library/core/primitives/int.md), [Wide integers](../../library/core/wide-integers.md) |
| `float`, `float32`, `float16`, `float128`, `float256` | [float](../../library/core/primitives/float.md), [Wide and narrow floats](../../library/core/wide-floats.md) |
| `bool`, `char` | [bool](../../library/core/primitives/bool.md), [char](../../library/core/primitives/char.md) |
| `string`, `str` | [Text](../../library/core/text/index.md) |
| tuple, braid, list, array, window, map, set, range, box | [Compound types](./compound.md) |
| `T?`, `T ! E`, `fn(A) -> R`, `never` | [Functions and results](./functions-and-results.md) |
| `struct`, `enum`, `obj`, `interface`, `any`, generics | [Type declarations](../declarations/types.md) |

## Types you define

`struct`, `enum`, `obj` and `interface` declare new types; see the [guide](../../guide/types/index.md). A value of type `any shape` holds any type that implements the interface `shape`. Generic types and functions take type parameters in angle brackets, optionally bounded: `fn largest<T: order>(a: T, b: T) -> T`.

Standard interfaces include `order` (comparison with `<`), `eq`, `show` (conversion to text), and the operator interfaces `add`, `sub`, `mul`, `div`, `rem` and `neg`, which a type implements to support the matching operator. See [interfaces](../../library/core/interfaces/index.md).

## Aliases

```pelago
type meters = float

fn main() {
    const m: meters = 2.5
    print("#m")
}
```

```text
2.5
```

An alias is another name for the same type, not a new type. See [Aliases](../../guide/types/aliases.md).
