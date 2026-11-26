---
title: defer
description: "defer runs code when the scope ends, in reverse order, including on early return, and what it does not do."
---

`defer stmt` or `defer { ... }` schedules code to run when the **enclosing scope** ends, however it ends by `return`, `break` or falling off the end. Several defers run in reverse order of writing, last first.

```pelago
fn f(x: int) -> int {
    defer print("cleanup #x")
    if x > 0 {
        return 1
    }
    print("body")
    return 0
}

fn main() {
    print(f(1))
    print(f(0))
}
```

```text
cleanup 1
1
body
cleanup 0
0
```

## Order and scope

A `defer` in a loop body runs at the end of each pass, and defers in the same scope run last-in first-out.

```pelago
fn main() {
    for i of 0..2 {
        defer print("end #i")
        print("start #i")
    }
    defer print("first written")
    defer print("second written")
    print("main body")
}
```

```text
start 0
end 0
start 1
end 1
main body
second written
first written
```

## What defer does not do

- **It does not run when the program stops.** A `panic`, a failed `assert` or a trap such as overflow ends the program at once, with no unwinding; deferred code is skipped.
- A [`become`](./tail-calls.md) cannot follow a `defer` in the same function (``become cannot follow a defer``): the deferred code would have to run after the call.

```pelago exit
fn main() {
    defer print("deferred")
    panic("boom")
}
```

```text
boom
```

## Typical use

Pair acquiring with releasing: open a file, then `defer` the close on the next line, so every path out closes it. For values with a destructor, `deinit` does this automatically; see [Ownership](../ownership/index.md).

## Related

[Ownership](../ownership/index.md), [Errors](../errors.md), [Tail calls](./tail-calls.md)
