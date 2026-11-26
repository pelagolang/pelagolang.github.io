---
title: Comparison and logic
description: "== != < > <= >= and && ||: structural equality, ordering and short-circuiting."
---

`==` and `!=` compare values structurally, so two lists with equal elements are equal. `<`, `>`, `<=` and `>=` need the type to support ordering. `&&` and `||` short-circuit: the right side runs only when it can change the answer.

```pelago
fn main() {
    const a = [1, 2]
    const b = [1, 2]
    print(a == b, a != b, "a" < "b", 1 < 2 && 2 < 1, 1 < 2 || 2 < 1)
}
```

```text
true false true false true
```

## Related

- [eq](../../library/core/interfaces/eq.md) and [order](../../library/core/interfaces/order.md) say which types support these operators
