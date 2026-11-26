---
title: Bitwise
description: "& | ^ ~ << >>: bit operations on integers."
---

`&`, `|`, `^`, `~`, `<<` and `>>` work on integers. `>>` on a signed integer keeps the sign.

```pelago
fn main() {
    print(6 & 3, 6 | 3, 6 ^ 3, ~6, 1 << 4, -16 >> 2)
}
```

```text
2 7 5 -7 16 -4
```

They bind tighter than comparison; see the [precedence table](./index.md#precedence).
