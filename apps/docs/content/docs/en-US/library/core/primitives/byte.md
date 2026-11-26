---
title: byte
description: "byte is another name for uint8."
---

`byte` is another name for `uint8`: an unsigned 8-bit integer, from `0` to `255`. It is the element type of binary data such as `[byte]`. Everything on the [`uint8`](./uint8.md) page applies.

```pelago
fn main() {
    const a: byte = 255
    const b: uint8 = a
    print("#(a == b) #(a +% 1)")
}
```

```text
true 0
```

## Related

[`uint8`](./uint8.md), [Primitive types](./index.md)
