---
title: guard
description: "guard checks a condition or pattern and runs an else block that must leave the function or loop."
---

`guard cond else { ... }` continues when the condition holds and runs the `else` block when it does not. The `else` block is meant to **leave**: with `return`, `break`, `continue` or a call that does not return. That lets you handle the unusual case first and keep the main path unindented.

```pelago
fn f(xs: [int]) -> string {
    guard xs.len() > 0 else {
        return "empty"
    }
    guard xs[0] is 1 else {
        return "no"
    }
    return "ok"
}

fn main() {
    print(f([]), f([2]), f([1]))
}
```

```text
empty no ok
```

## Binding with a pattern

`guard x is pattern else { ... }` binds the names of the pattern for the rest of the scope, which is what `if` cannot do without nesting:

```pelago
fn f(x: int?) -> int {
    guard x is some(v) else {
        return -1
    }
    return v * 2
}

fn main() {
    print(f(4), f(none))
}
```

```text
8 -1
```

## Not finished

A `guard` whose `else` block does not leave is accepted by the checker but stops with `not lowered yet`.

## Related

[if and else](./if-else.md), [Pattern matching](../switch.md), [Errors and options](../errors.md)
