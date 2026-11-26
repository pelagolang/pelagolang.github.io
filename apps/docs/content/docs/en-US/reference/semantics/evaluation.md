---
title: Evaluation order
description: "Operands and arguments run left to right; && || ?? and ?: run their right side only when needed."
---

Operands and arguments are evaluated left to right. `&&`, `||`, `??` and `?:` evaluate their right side only when needed.

```pelago
fn tag(s: string, v: int) -> int {
    print(s)
    v
}

fn main() {
    print(tag("a", 1) + tag("b", 2) * tag("c", 3))
    const x = false && tag("never", 1) == 1
    print(x)
}
```

```text
a
b
c
7
false
```

The three calls run in the order they are written, even though `*` binds tighter than `+`. Precedence decides how the operands group, not when they run. The call in `x` never runs because the left side of `&&` is already false.
