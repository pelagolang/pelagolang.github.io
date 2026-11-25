---
title: int64
description: "int64 is another name for int."
---

`int64` is the same type as `int`: a 64-bit two's complement signed integer, from `-9223372036854775808` to `9223372036854775807`. Use whichever name reads better; the compiler does not tell them apart. Everything on the [`int`](./int.md) page applies, including its methods (`abs`, `min`, `max`, `pow`, the checked, wrapping and saturating forms, and the narrowing methods).

```pelago
fn main() {
    const a: int64 = 9223372036854775807
    const b: int = a
    print("#(a +% 1) #(b == a)")
}
```

```text
-9223372036854775808 true
```

## Related

[`int`](./int.md), [Primitive types](./index.md)
