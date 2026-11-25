---
title: if and else
description: "if, else if and else, if as an expression, the ?: conditional, and testing a pattern with is."
---

`if` runs a block when its condition is `true`. The condition is written without parentheses and must be a `bool`; the braces are required.

```pelago
fn main() {
    const n = 5
    if n < 3 {
        print("a")
    } else if n < 6 {
        print("b")
    } else {
        print("c")
    }
}
```

```text
b
```

## As an expression

An `if` with an `else` produces a value: the value of the block that ran. Both branches must have the same type. `c ? x : y` is the short spelling of the same thing.

```pelago
fn main() {
    const n = 5
    const s = if n > 3 { "big" } else { "small" }
    const t = n > 3 ? "yes" : "no"
    print(s, t)
}
```

```text
big yes
```

## Testing a pattern with is

`v is pattern` is a `bool` that also binds names for the block it guards. It works on options, results, enum cases and anything a [pattern](../switch.md#is-a-pattern-as-a-test) can match, and it combines with `&&`.

```pelago
fn main() {
    const a: int? = 4
    if a is some(v) && v > 3 {
        print("v=#v")
    }
    if a is none {
        print("none")
    } else {
        print("some")
    }
}
```

```text
v=4
some
```

## Errors

A condition that is not a `bool` is rejected at compile time:

```pelago error
fn main() {
    const n = 1
    if n { print("x") }
}
```

```text
this has type `{integer}`, but `bool` is expected
```

## Related

[unless](./unless.md), [guard](./guard.md), [Pattern matching](../switch.md), [`bool`](../../library/core/primitives/bool.md)
