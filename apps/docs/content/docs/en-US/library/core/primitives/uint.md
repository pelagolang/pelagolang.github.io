---
title: uint
description: "uint is another name for uint64."
---

`uint` is the same type as `uint64`: the unsigned machine integer, from `0` to `18446744073709551615`. Everything on the [`uint64`](./uint64.md) page applies.

```pelago
fn main() {
    const a: uint = 18446744073709551615
    const b: uint64 = a
    print("#(a == b) #(a +% 1)")
}
```

```text
true 0
```

## Related

[`uint64`](./uint64.md), [Primitive types](./index.md)
