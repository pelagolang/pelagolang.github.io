---
title: Functions and results
description: "T?, T ! E, function types and never."
---

| Type | Meaning |
| --- | --- |
| `T?` | A `T` or `none`. See [option](../../library/core/options/option.md). |
| `T ! E` | A `T` or an error `E`. See [result](../../library/core/options/result.md). |
| `fn(A, B) -> R` | A function or closure. `once fn` marks a closure that may be called only once. |
| `never` | The type of an expression that does not return, such as `panic("...")`. See [Functions](../declarations/functions.md). |

A function without a result type returns nothing.

A closure is written with `~>` and can be passed where a function type is expected. It captures what it uses from the surrounding code:

```pelago
fn apply(f: fn(int) -> int, x: int) -> int = f(x)

fn main() {
    const k = 10
    print(apply((x: int) ~> x + k, 5))
    const o: int? = none
    print(o ?? -1)
}
```

```text
15
-1
```

## Related

- [Functions guide](../../guide/functions.md)
- [Error handling](../../guide/errors.md)
