---
title: Parsing numbers
description: "parseInt and parseFloat: the accepted forms, every error message, and how to handle them."
---

`parseInt()` and `parseFloat()` turn text into numbers. They never stop the program: a failure is an `err(parse_error)`, and `parse_error` has a `message` and prints as it.

| Method | Result |
| --- | --- |
| `parseInt()` | `int ! parse_error` |
| `parseFloat()` | `float ! parse_error` |
| `parseFloat16()`, `parseFloat128()`, `parseFloat256()` | the matching float type `! parse_error` |

## Integers

An optional sign (`+` or `-`) followed by decimal digits, and nothing else. No spaces, no `_` separators, no `0x` prefix.

| Text | Result |
| --- | --- |
| `"42"`, `"+5"`, `"-0"` | `ok(42)`, `ok(5)`, `ok(0)` |
| `" 5"` | `err(bad digit at position 0)` |
| `"0x10"` | `err(bad digit at position 1)` |
| `"1_000"` | `err(bad digit at position 1)` |
| `""` | `err(empty text is not a number)` |
| `"-"` | `err(no digits)` |
| `"99999999999999999999"` | `err(the number is too large)` |

`-9223372036854775808` parses; one more than the range in either direction is "too large".

## Floats

Decimal text with an optional sign, an optional fraction (`.5` and `5.` are fine) and an optional exponent (`e` or `E`). `inf` and `nan` are not accepted.

```pelago
fn main() {
    print("1.5".parseFloat(), ".5".parseFloat(), "5.".parseFloat(), "1e3".parseFloat())
    print("-1.5E-2".parseFloat(), "inf".parseFloat(), "1.2.3".parseFloat())
}
```

```text
ok(1.5) ok(0.5) ok(5) ok(1000)
ok(-0.015) err(bad number) err(bad number)
```

## Handling the result

Take the result apart with `switch`, give a default with `or`, or pass the failure on with `?`.

```pelago
fn main() {
    switch "4x".parseInt() {
        case ok(v): print("got #v")
        case err(e): print("failed: #e")
    }
    print("42".parseInt().or(0) + 1, "oops".parseInt().or(0))
    print("1,2,3".split(",").map(s ~> s.parseInt().or(0)).toList())
}
```

```text
failed: bad digit at position 1
43 0
[1, 2, 3]
```

## Related

[`str`](./str.md), [`int`](../primitives/int.md), [`float`](../primitives/float.md), [Options and results](../options-and-results.md)
