---
title: Error types
description: "parse_error, io_error, io_kind and the shared error type: what they hold and where they are returned."
---

## `parse_error`

A failed text-to-number conversion, with a `message: string`. It is `show`, and prints its message. Returned by `parseInt`, `parseFloat` and the other float parsers, and by `json.parse`, `regex.compile` and `big.parse` in `std`.

```pelago
fn main() {
    switch "4x".parseInt() {
        case ok(v): print(v)
        case err(e): print(e.message)
    }
}
```

```text
bad digit at position 1
```

## `io_error` and `io_kind`

A failed file or stream operation. `io_error` has a `kind: io_kind` for the cases a program tells apart, and a `message` for the person (it names the path when there is one). `io_kind` is an enum: `notFound`, `denied`, `invalid`, `other`.

```pelago
import std.fs

fn main() {
    switch fs.readText("/nonexistent") {
        case ok(t): print(t)
        case err(e): print("#(e.kind) #(e.message)")
    }
}
```

```text
notFound opening /nonexistent: no such file or directory
```

## `error`

The shared error type that `context` produces: a message made of the context text, a colon and the original error. Use it as the error type of a function whose callers only report problems: `fn load(t: str) -> int ! error`.

## Making your own

Any type can be an error type: a string, a struct, or an enum with data. Implement `show` so it can be printed; implement the `converts` interface to let `?` turn it into another error type.

## Related

[`result`](./result.md), [Interfaces](../index.md#interfaces), [`std.fs`](../../std/io/fs.md)
