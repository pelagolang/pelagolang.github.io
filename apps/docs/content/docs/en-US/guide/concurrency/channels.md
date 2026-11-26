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

## Bounded channels

`chan<T>()` has no limit: `send` always queues the value. `chan<T>(n)` holds at most `n` values, and `send` waits while that many are queued, which keeps a fast producer from running far ahead of a slow consumer.

## tryRecv

`rx.tryRecv()` takes a value if one is queued and returns `none` at once if not, without waiting:

```pelago
fn main() {
    const (tx, rx) = chan<int>(2)
    tx.send(1)
    tx.send(2)
    print(rx.tryRecv(), rx.tryRecv(), rx.tryRecv())
}
```

```text
some(1) some(2) none
```

## Sending to a gone receiver

`send` returns `void ! closed`: it fails with `closed` when the receiver is gone, so the sender can stop instead of queueing values nobody will read.

```pelago
fn gone(sink r: receiver<int>) {{}}

fn main() {
    const (tx, rx) = chan<int>()
    gone(sink rx)
    switch tx.send(1) {
        case ok(_): print("sent")
        case err(_): print("closed")
    }
}
```

```text
closed
```

## Edge cases

- A task that waits on a channel is parked, not polling; see [The runtime](./runtime.md).
- To wait on a channel and something else at once, use [select](./select.md).

## Related

- [Tasks](./tasks.md), [select](./select.md), [Pattern matching](../switch/options-results.md)
