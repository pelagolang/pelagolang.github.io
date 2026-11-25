---
title: result
description: "T ! E: success or a typed failure: ok and err, switch, ?, every method, context, and combining error types."
---

`T ! E` (long form `result<T, E>`) is either `ok(value)` of type `T`, or `err(error)` of type `E`. A function that can fail for reasons outside the program (bad input, a missing file) returns one instead of stopping.

## Making and taking apart

```pelago
fn check(n: int) -> int ! string {
    if n > 0 { return ok(n) }
    return err("not positive")
}

fn main() {
    switch check(3) {
        case ok(v): print("ok #v")
        case err(e): print("error #e")
    }
    print(check(-1))
}
```

```text
ok 3
err("not positive")
```

## Passing errors up with `?`

`e?` unwraps an `ok` and otherwise returns the `err` from the current function. The function must return a result whose error type the failure converts to. Adjust the type with `mapErr`, or use the shared `error` type with `context`.

```pelago
fn conv(t: str) -> int ! string {
    const n = t.parseInt().mapErr(e ~> copy e.message)?
    ok(n)
}

fn load(t: str) -> int ! error {
    const n = t.parseInt().context("reading count")?
    ok(n * 2)
}

fn main() {
    print(conv("4"), conv("z"))
    print(load("21"))
    switch load("y") {
        case ok(v): print(v)
        case err(e): print("failed: #e")
    }
}
```

```text
ok(4) err("bad digit at position 0")
ok(42)
failed: reading count: bad digit at position 0
```

## Methods

| Method | Result | Behaviour |
| --- | --- | --- |
| `isOk()`, `isErr()` | `bool` | |
| `ok()` | `T?` | The value, or `none`. |
| `err()` | `E?` | The error, or `none`. |
| `or(x)` | `T` | The value, or `x`. |
| `unwrapOrElse(f)` | `T` | The value, or `f(error)`. |
| `map(f)` | `U ! E` | Transform the value when it is `ok`. |
| `andThen(f)` | `U ! E` | `f` returns a result; an error stays the same error. |
| `orElse(f)` | `T ! F` | On an error, `f(error)` gives a new result. |
| `mapErr(f)` | `T ! F` | Transform the error. |
| `context(message)` | `T ! error` | Replace the error with the shared `error` that reads `message: <original>`. |
| `isOkAnd(f)` | `bool` | `ok`, and `f` holds. |

```pelago
fn main() {
    const r: int ! string = ok(1)
    print(r.ok(), r.err(), r.map(x ~> x + 1), r.unwrapOrElse(e ~> 0))
    const e: int ! string = err("no")
    print(e.ok(), e.err(), e.or(7), e.mapErr(s ~> s.len()), e.isErr())
    print(r.andThen(x ~> ok(x * 10)), r.isOkAnd(x ~> x == 1))
}
```

```text
some(1) none ok(2) 1
none some("no") 7 err(2) true
ok(10) true
```

## Edge cases

- A result is printed as `ok(...)` or `err(...)`.
- `?` in a function whose return type is not an option or result is a compile error.
- Results never stop the program: only `panic`, a failed `assert`, or a trap such as overflow does.

## Related

[`option`](./option.md), [Error types](./errors.md), [Errors and options (guide)](../../../guide/errors.md)
