---
title: unless
description: "unless runs a block when a condition is false, with an optional else."
---

`unless cond { ... }` is `if !cond { ... }`. It reads better for a condition you are checking for failure, and it takes an `else` branch like `if`.

```pelago
fn main() {
    var i = 0
    while true {
        i += 1
        unless i < 5 {
            break
        }
    }
    unless i == 0 {
        print("i=#i")
    } else {
        print("zero")
    }
}
```

```text
i=5
```

`unless` is a statement, not an expression.

## Related

[if and else](./if-else.md), [guard](./guard.md)
