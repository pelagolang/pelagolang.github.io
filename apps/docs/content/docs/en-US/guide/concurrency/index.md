---
title: Concurrency
description: "Tasks, channels, scopes, cancellation, select, locks and atomics, async functions and the runtime, one page each."
---

Concurrent code in Pelago builds on the [ownership rules](../ownership/index.md): a task owns what it is given, so tasks cannot share a changing value by accident. There are no data races to debug, because a value that two tasks could both change is rejected when the program is compiled.

| Feature | What it does | Page |
| --- | --- | --- |
| `spawn`, `join` | Start a task and wait for its result. | [Tasks](./tasks.md) |
| `chan<T>()`, `send`, `recv` | Pass values between tasks. | [Channels](./channels.md) |
| `scope` | Run tasks that borrow from the surrounding code and wait for all of them. | [Scopes](./scopes.md) |
| `cancel`, `cancelled()`, `yield_now()` | Cooperative stopping. | [Cancellation](./cancellation.md) |
| `select`, `timeout`, `time.sleep` | Wait for several things at once, or give up after a time. | [select and timeouts](./select.md) |
| `lock`, `atomic`, `semaphore`, `barrier` | Share state safely when channels are not enough. | [Sharing state](./sharing.md) |
| `async fn`, `await`, `blockOn` | A function that runs as a task and gives a future. | [Async functions](./async.md) |
| `coroutine`, `emit` | A generator: a function that produces values one at a time. | [Coroutines](./coroutines.md) |
| Stacks, ending the program, deadlocks | How the runtime runs tasks. | [The runtime](./runtime.md) |

## The model in four rules

1. A task is a closure that runs on a stack of its own. It can use only what it is given by its capture list: `[sink x]` moves a value in, `[inout x]` lets a scoped task change a variable.
2. Values move between tasks through channels, or come back through `join`. Nothing is shared by accident.
3. Stopping is cooperative: nothing interrupts a task and nothing unwinds.
4. When every task is waiting and nothing can wake one, the program stops with a deadlock report instead of hanging.

## Related

- [Ownership](../ownership/index.md), [Functions](../functions.md) (closures and capture lists), [time](../../library/std/time/index.md)
