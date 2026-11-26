---
title: Guards, default and exhaustiveness
description: "Conditions on a case with if, binding the whole value, the default case, evaluation order, and what the compiler checks."
---

## Guards

A case can have a condition after `if`. The case matches only when the pattern matches **and** the condition is true. Names bound by the pattern are available in the condition.

```pelago
fn main() {
    const opt: int? = 2
    switch opt {
        case some(n) if n > 3: print("big")
        case some(n) if n > 1: print("medium #n")
        case some(_): print("small")
        case none: print("missing")
    }
}
```

```text
medium 2
```

## Binding the value

A bare name matches anything and binds it. Together with a guard it makes a catch-all with a condition: `case big if big > 1000`.

## default

`default` matches anything not matched before. It must come last, and it makes any `switch` complete.

## Exhaustiveness

When the value's type has a fixed set of shapes (enums, options, results, `bool`), every shape must be covered or there must be a `default`. For integers a `default` is always required, and for lists a case must cover every length. The error names what is missing:

```pelago error
fn main() {{
    const n = 3
    const r = switch n {{ case 1: "a" }}
}}
```

```text
main:3:22: error: this `switch` does not handle `_`; add a case for it or a `default`
```

## Order matters

The first matching case wins, and the compiler does not warn when a later case can never run. Put specific cases before general ones:

```pelago
fn main() {
    const x = 5
    switch x {
        case 1: print("a")
        case 1: print("b")
        default: print("c")
    }
}
```

```text
c
```

## Related

- [Values and ranges](./values.md), [Enums](./enums.md), [Lists](./lists.md)
