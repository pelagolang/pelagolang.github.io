---
title: Option and result patterns
description: "Matching some and none for options and ok and err for results, nested inside other patterns."
---

`some(...)` and `none` match options; `ok(...)` and `err(...)` match results. These names are **patterns only**: a value is written plainly (`const o: int? = 3`, or `none`).

```pelago
fn main() {
    const opt: int? = 7
    switch opt {
        case some(n) if n > 3: print("big")
        case some(_): print("small")
        case none: print("missing")
    }
}
```

```text
big
```

## Results

Both sides must be handled:

```pelago error
fn main() {
    const r: int ! string = ok(1)
    switch r {
        case ok(v): print(v)
    }
}
```

```text
main:3:12: error: this `switch` does not handle `err(_)`; add a case for it or a `default`
```

```pelago
fn main() {
    const r: int ! string = err("bad")
    switch r {
        case ok(v): print(v)
        case err(e): print("failed: #e")
    }
}
```

```text
failed: bad
```

## Nesting

Options and results nest in the usual ways: `ok(some(x))`, `ok(none)` and `err(e)` for a result holding an option. The compiler reports the one you forgot, as `this switch does not handle ok(some(_))`.

When you only want to forward the error, the `?` operator is shorter; see [Errors](../errors.md).

## Related

- [Option](../../library/core/options/option.md), [Result](../../library/core/options/result.md), [Errors](../errors.md), [is](./is.md)
