---
title: Values and ranges
description: "switch on numbers, text, characters and bool: literals, several values in one case, ranges, and binding the value."
---

The simplest patterns are literal values and ranges.

```pelago
fn classify(n: int) -> string {
    switch n {
        case 0: "zero"
        case 1, 2, 3: "small"
        case 4..10: "medium"
        case big if big > 1000: "huge"
        case ..0: "negative"
        default: "large"
    }
}

fn main() {
    for n of [0, 2, 5, 5000, -3, 50] { print(classify(n)) }
}
```

```text
zero
small
medium
huge
negative
large
```

## Forms

| Pattern | Matches |
| --- | --- |
| `case 0` | That value. |
| `case 1, 2, 3` | Any of several values. |
| `case 4..10` | A range, from 4 up to but not including 10. |
| `case ..0` | Everything below 0. |
| `case name` | Anything, binding it to `name`. |
| `case name if condition` | Anything for which the condition holds; see [Guards](./guards-default.md). |

Ranges follow the same rules as in [for](../control-flow/ranges.md).

## Text, characters and bool

```pelago
fn main() {
    const s = "hi"
    print(switch s { case "hi", "hello": 1 default: 0 })
    const c = 'x'
    switch c {
        case 'a'..'m': print("first half")
        case 'n'..'z': print("second half")
        default: print("other")
    }
    switch true { case true: print("t") case false: print("f") }
}
```

```text
1
second half
t
```

A `bool` has two values, so covering both needs no `default`.

## Integers need a default

An integer has too many values to list, so a `switch` over one must end with `default` (or a binding case), otherwise it is an error:

```pelago error
fn main() {
    const x = 5
    switch x {
        case 1..3: print("a")
    }
}
```

```text
main:3:12: error: this `switch` does not handle `_`; add a case for it or a `default`
```

## Related

- [Guards, default and exhaustiveness](./guards-default.md), [Ranges](../control-flow/ranges.md), [Enums](./enums.md)
