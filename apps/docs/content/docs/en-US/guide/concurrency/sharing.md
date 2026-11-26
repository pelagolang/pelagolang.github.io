---
title: Sharing state
description: "lock, atomic, semaphore and barrier: safe shared values, with with-only access, sequentially consistent atomics, permits and barriers."
---

Most programs need only tasks and channels. When tasks must share a value, library types make that safe. `copy handle` gives another handle to the same value, and each task takes its own.

## lock

`lock(value)` holds a value that one task changes at a time. The only way in is `with`, which gives a closure a temporary `inout` and releases the lock when the closure returns, so a lock cannot be forgotten. `withWhen(ready, f)` waits until `ready(value)` is true first.

## atomic

`atomic(n)` holds an `int` that tasks read and change without a lock:

| Method | Meaning |
| --- | --- |
| `load()` | Read the value. |
| `store(v)` | Write the value. |
| `add(d)` | Add `d`; returns the old value. |
| `swap(v)` | Replace; returns the old value. |
| `compareSwap(expected, desired)` | Store `desired` only if the value is still `expected`; says whether it did. |

Every operation is sequentially consistent; there are no weaker orders to pick from.

```pelago
fn main() {
    const total = lock(0)
    const hits = atomic(0)
    scope s {
        for i of 1..4 {
            const t = copy total
            const h = copy hits
            s.spawn(() ~> {
                t.with(n ~> { n += i })
                h.add(1)
            })
        }
    }
    print(total.with(n ~> n), hits.load())
    print(hits.compareSwap(3, 10), hits.compareSwap(3, 11), hits.swap(0), hits.load())
}
```

```text
6 3
true false 10 0
```

## semaphore and barrier

`semaphore(n)` limits how many tasks do something at once: `acquire` waits for a permit and `release` returns one. `barrier(n)` holds tasks until all `n` have called `wait()`.

A task waiting on a lock, semaphore or barrier is parked, not polling.

## Edge cases

- Each atomic operation is a call into the runtime today.
- A lock cannot be left held: `with` always releases it.

## Related

- [Channels](./channels.md), [Scopes](./scopes.md), [The runtime](./runtime.md)
