---
title: Channels
description: "chan, send, recv and iter: passing values between tasks, how a channel closes, and the deadlock report."
---

A channel carries values between tasks. `chan<T>()` creates a sender and a receiver. `send` puts a value in, and `recv` takes one out, giving an option: `none` means the channel is closed and empty, which happens when every sender is gone.

```pelago
fn main() {
    const (tx, rx) = chan<int>()
    spawn([sink tx] ~> {
        for i of 0..3 { tx.send(i) }
    })

    var total = 0
    var running = true
    while running {
        switch rx.recv() {
            case some(v): total += v
            case none: running = false
        }
    }
    print("#total")
}
```

```text
3
```

The sender is moved into the task. When the task ends it is dropped, the channel closes and the loop above finishes.

## Reading until the end

`rx.iter()` walks the values until the channel closes, so a plain `for` does the same job:

```pelago
fn main() {
    const (tx, rx) = chan<int>()
    spawn([sink tx] ~> {
        tx.send(1)
        tx.send(2)
    })
    for v of rx.iter() { print(v) }
}
```

```text
1
2
```

## A channel closes when every sender is gone

A sender can be copied (`copy tx`), and each copy keeps the channel open. If you keep a sender yourself and wait for the end, nothing can close it and the program reports a deadlock:

```text
deadlock: waiting for a value that nobody can provide
```

Move every sender into the tasks that use it, as above.

## Receiving one value

```pelago
fn main() {
    const (tx, rx) = chan<int>()
    spawn([sink tx] ~> {
        tx.send(1)
    })
    print(rx.recv(), rx.recv())
}
```

```text
some(1) none
```

The first `recv` gives `some(1)`; once the only sender has ended, `recv` gives `none`.

## Edge cases

- A task that waits on a channel is parked, not polling; see [The runtime](./runtime.md).
- To wait on a channel and something else at once, use [select](./select.md).

## Related

- [Tasks](./tasks.md), [select](./select.md), [Pattern matching](../switch/options-results.md)
