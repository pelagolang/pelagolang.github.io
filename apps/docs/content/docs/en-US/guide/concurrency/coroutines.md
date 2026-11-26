---
title: Coroutines
description: "coroutine and yielder: a function that produces values one at a time, with next, iter, emit and cancellation."
---

A `coroutine<T>` runs a function that hands out values one at a time. The body receives a `yielder`, and `emit` gives a value to whoever called `next()` and waits to be asked for the next. It is the tool for generators: sequences produced lazily, with the state kept in ordinary local variables.

```pelago
fn main() {
    const gen = coroutine<int>(co ~> {
        for i of 0..3 { co.emit(i * 10) }
    })
    print(gen.next(), gen.next(), gen.next(), gen.next())
}
```

```text
some(0) some(10) some(20) none
```

`next()` runs the body to its next `emit` and returns `some(value)`; once the body has ended it returns `none`.

## Collecting everything

`iter()` runs the coroutine to the end and collects what it emits, so a `for` loop can walk it:

```pelago
fn main() {
    const g = coroutine<int>(co ~> {
        co.emit(1)
        co.emit(2)
    })
    for v of g.iter() { print(v) }
}
```

```text
1
2
```

## Stopping early

Dropping a coroutine that has not finished asks it to stop: inside the body, `co.cancelled()` becomes true and the body is resumed once so it can leave. Check it in an endless generator:

```pelago
fn main() {
    const co = coroutine<int>(co ~> {
        var i = 0
        while !co.cancelled() {
            co.emit(i)
            i += 1
        }
    })
    print(co.next(), co.next())
}
```

```text
some(0) some(1)
```

Nothing unwinds, so values the body still holds when it is cut short are not dropped.

## Notes

- A coroutine runs on its own stack, like a task; see [The runtime](./runtime.md).
- It runs only when `next()` is called: no other task is involved.

## Related

- [Tasks](./tasks.md), [Channels](./channels.md), [Iterators](../../library/core/collections/iter.md)
