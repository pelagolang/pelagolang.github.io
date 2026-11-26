---
title: select and timeouts
description: "select: waiting for a channel, cancellation and a timeout at once; time.sleep, and how a waiting program costs no processor time."
---

`select` waits for the first of several things. Each arm is a channel read, `cancelled()` or `timeout(duration)`.

## Waiting for cancellation

The arm `case cancelled()` runs when the running task or its scope is cancelled.

```pelago
fn main() {
    const (tx, rx) = chan<int>()
    scope s {
        s.spawn([sink rx] () ~> {
            select {
                case v = rx.recv() { print("got") }
                case cancelled() { print("cancelled") }
            }
        })
        yield_now()
        yield_now()
        s.cancel()
    }
    print("end")
}
```

```text
cancelled
end
```

## Timeouts

`time.sleep(duration)` parks the running task until the time has passed; other tasks keep running, and nothing spins. A `select` can give up after a time with the arm `case timeout(duration)`, which runs if no other arm is ready by then.

```pelago
import std.time

fn main() {
    const (tx, rx) = chan<int>()
    select {
        case v = rx.recv() { print("got") }
        case timeout(time.millis(5)) { print("timed out") }
    }
    tx.send(7)
    select {
        case v = rx.recv() { print("got #(v)") }
        case timeout(time.millis(5)) { print("timed out") }
    }
}
```

```text
timed out
got some(7)
```

The bound `v` of a channel arm is the option `recv` returns, so it prints as `some(7)`.

## Waiting costs nothing

When every task is waiting, the program sleeps in the kernel until the first deadline on Linux, macOS and Windows, so waiting costs no processor time.

## Related

- [Channels](./channels.md), [Cancellation](./cancellation.md), [time](../../library/std/time/index.md)
