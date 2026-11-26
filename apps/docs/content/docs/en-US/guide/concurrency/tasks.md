---
title: Tasks
description: "spawn and join: starting a task, getting its result, capture lists, and why a task must be given what it uses."
---

`spawn` starts a task running a closure and returns a handle. `join` waits for the task and gives back its result. `join` uses the handle up, so the call is marked `!!`.

```pelago
fn main() {
    const task = spawn(~> 6 * 7)
    print("answer: #(task.join!!())")
}
```

```text
answer: 42
```

## What a task can use

A task's closure lists what it takes from its surroundings. `[sink data]` moves `data` into the task, and the creating code can no longer touch it:

```pelago
fn crunch(data: [int]) -> int {
    var t = 0
    for x of data { t += x * x }
    t
}

fn main() {
    const data = [1, 2, 3]
    const task = spawn([sink data] ~> crunch(data))
    print("#(task.join!!())")
}
```

```text
14
```

A task started with plain `spawn` may outlive the function that started it, so it cannot borrow anything. Using a surrounding value without moving it in is an error that says how to fix it:

```pelago error
fn main() {
    const data = [1, 2]
    const t = spawn(~> data.len())
    print(data)
}
```

```text
main:3:21: error: the new thread may outlive this function, so `data` must be moved in: capture it with `[sink data]` (`copy data` first to keep your own)
```

`copy data` first keeps your own value: `spawn([sink copy data] ~> ...)`. To let tasks borrow from the surrounding code, use a [scope](./scopes.md).

## Returning values

The closure's last value is the task's result, and `join!!()` returns it. Return a [`result`](../../library/core/options/result.md) when the task can fail.

## Edge cases

- A task that is never joined is abandoned when `main` returns; see [The runtime](./runtime.md).
- Joining waits for the task to finish. If the task can never finish, the program stops with `deadlock: waiting for a task to finish that nobody can provide`.
- Every task runs on its own 256 KiB stack.

## Related

- [Channels](./channels.md), [Scopes](./scopes.md), [Cancellation](./cancellation.md), [Functions](../functions.md)
