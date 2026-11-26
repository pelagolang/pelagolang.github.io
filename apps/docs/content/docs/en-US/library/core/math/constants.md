---
title: Constants
description: "math.pi, math.tau and math.e: their values and type."
---

| Name | Value |
| --- | --- |
| `math.pi` | 3.141592653589793 |
| `math.tau` | 6.283185307179586, that is `2 * pi` |
| `math.e` | 2.718281828459045 |

All three are `float` constants.

```pelago
fn main() {
    print(math.pi, math.tau, math.e)
    const r = 2.0
    print(math.pi * r * r)
}
```

```text
3.141592653589793 6.283185307179586 2.718281828459045
12.566370614359172
```

## Related

- [math](./index.md), [float](../primitives/float.md)
