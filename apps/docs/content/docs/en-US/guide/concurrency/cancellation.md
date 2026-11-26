---
title: Cancellation
description: "t.cancel(), s.cancel(), cancelled() and yield_now(): cooperative stopping with nothing interrupted and nothing unwound."
---

Stopping is cooperative: nothing interrupts a task and nothing unwinds. `t.cancel()` asks a task to stop, and the task sees `cancelled()` become true; `s.cancel()` does the same for every task of a scope, including ones started afterwards. A task that wants to stop early looks at `cancelled()` between steps. A cancelled task still has to be joined (or dropped) as usual. `yield_now()` lets other tasks run.

```pelago
fn main() {
    const t = spawn(() ~> {
        var n = 0
        while !cancelled() {
            n += 1
            yield_now()
        }
        n > 0
    })
    yield_now()
    t.cancel()
    print(t.join!!())
}
```

```text
true
```

## Cancelling a scope

`s.cancel()` reaches every task in the scope. A `select` arm, `case cancelled()`, can wake a task that is waiting; see [select](./select.md).

## Edge cases

- A task that never looks at `cancelled()` and never waits will run to its end.

## Related

- [Tasks](./tasks.md), [Scopes](./scopes.md), [select](./select.md)
