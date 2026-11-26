---
title: Pattern matching
description: "switch and is: choosing by value and by shape, one page for each kind of pattern, guards, exhaustiveness and in-place matching."
---

Pelago has a single construct for branching on what a value is: `switch`. It handles numbers, text, enums, structs, tuples, lists, options and results. It is an **expression**, so each case produces a value, and the compiler checks that every possible shape is covered.

```pelago
fn classify(n: int) -> string {
    switch n {
        case 0: "zero"
        case 1, 2, 3: "small"
        case 4..10: "medium"
        default: "large"
    }
}

fn main() {
    for n of [0, 2, 5, 50] { print(classify(n)) }
}
```

```text
zero
small
medium
large
```

## The shape of a switch

```text
switch value {
    case pattern: result
    case pattern if condition: result
    default: result
}
```

- Cases are tried **in order**; the first match wins.
- Each case is one expression or a block; the whole `switch` has the type of its cases.
- A `switch` used as a statement can have cases that just do something and produce no value.
- If the value has a fixed set of shapes (an enum, an option, a result, a bool) the compiler requires every one to be covered, or a `default`.

## Pages

| Page | Patterns |
| --- | --- |
| [Values and ranges](./values.md) | Literals, several values per case, ranges, text, characters, bool. |
| [Enums](./enums.md) | Cases, their fields, nested patterns. |
| [Structs and tuples](./structs-tuples.md) | Field patterns, `..`, tuple positions. |
| [Lists](./lists.md) | `[]`, `[x]`, `[first, ..., last]`, `[h, ...t]`, literals inside. |
| [Options and results](./options-results.md) | `some`, `none`, `ok`, `err`. |
| [Guards, default and exhaustiveness](./guards-default.md) | `if` conditions, binding names, `default`, the missing-case error. |
| [is](./is.md) | A pattern as a yes or no test, in `if`, `while`, `guard` and list builders. |
| [Matching in place](./in-place.md) | `switch x!` to change what you matched. |

## Where patterns appear

Besides `switch` and `is`, patterns are used to unpack values in declarations: `const (a, b, c) = t`. See [Tuples](../types/tuples.md).

## Related

- [Enums](../types/enum.md), [Options](../../library/core/options/option.md), [Results](../../library/core/options/result.md), [Control flow](../control-flow/index.md)
