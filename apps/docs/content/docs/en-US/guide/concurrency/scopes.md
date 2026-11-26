---
title: Scopes
description: "scope: tasks that may borrow from the surrounding code, the wait at the end, and the rule that two tasks may not change the same variable."
---

A `scope` runs tasks that may borrow from the surrounding code, and it waits for all of them before it ends. Each task states which variables it changes.

```pelago
fn sum(xs: [int]) -> int {
    var t = 0
    for x of xs { t += x }
    t
}

fn main() {
    const xs = [1, 2, 3, 4, 5, 6]
    var left = 0
    var right = 0
    const mid = xs.len() / 2
    scope s {
        s.spawn([inout left] ~> left = sum(xs[..mid]))
        s.spawn([inout right] ~> right = sum(xs[mid..]))
    }
    print("#(left + right)")
}
```

```text
21
```

Both tasks read `xs` without moving it, because the scope cannot end before they do. Each changes a different variable.

## The compiler rejects shared changes

```pelago error
fn main() {
    var n = 0
    scope s {
        s.spawn([inout n] ~> n = 1)
        s.spawn([inout n] ~> n = 2)
    }
    print(n)
}
```

```text
main:5:24: error: `n` is captured by two tasks, and at least one of them changes or consumes it
```

Reading from several tasks is fine; changing or consuming from more than one is not.

## Why a scope instead of spawn

Plain `spawn` needs everything moved in because the task may outlive its creator. A scope guarantees the tasks finish first, so borrowing is safe. Prefer a scope for fork-and-join work on local data.

## Related

- [Tasks](./tasks.md), [Cancellation](./cancellation.md) (`s.cancel()`), [inout](../ownership/inout.md)
