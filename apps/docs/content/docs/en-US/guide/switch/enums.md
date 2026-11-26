---
title: Enum patterns
description: "Matching enum cases, binding their fields, nested patterns and literals inside cases, and the check that every case is covered."
---

A pattern names an enum case and binds its fields. A leading dot finds the case in the enum being switched on.

```pelago
enum shape {
    circle(radius: float)
    rect(w: float, h: float)
    empty
}

fn area(s: shape) -> float {
    switch s {
        case .circle(r): 3.14159 * r * r
        case .rect(w, h): w * h
        case .empty: 0.0
    }
}

fn main() {
    print("#(area(.rect(2.0, 3.0)))")
}
```

```text
6
```

Fields are bound by position (`.rect(w, h)`); `_` ignores one: `.rect(_, h)`.

## Nested patterns

Patterns can be put inside patterns: a literal in a field, an option inside a case, a guard on top.

```pelago
enum e {
    a(int, int)
    b(string?)
    c
}

fn f(x: e) -> string {
    switch x {
        case .a(0, y): "a0 #y"
        case .a(x, y) if x == y: "same"
        case .a(_, _): "a"
        case .b(some(s)): "b #s"
        case .b(none): "bn"
        case .c: "c"
    }
}

fn main() {
    print(f(.a(0, 5)), f(.a(2, 2)), f(.a(1, 2)), f(.b("q")), f(.b(none)), f(.c))
}
```

```text
a0 5 same a b q bn c
```

## Missing cases are errors

```pelago error
enum dir { north, south }

fn name(d: dir) -> string {
    switch d {
        case .north: "n"
    }
}

fn main() {
    print(name(.north))
}
```

```text
main:4:12: error: this `switch` does not handle `.south`; add a case for it or a `default`
```

Adding a case to an enum therefore shows every `switch` that must change. If you do want a catch-all, write `default`; see [Guards, default and exhaustiveness](./guards-default.md).

## Related

- [Enums](../types/enum.md), [Options and results](./options-results.md), [is](./is.md)
