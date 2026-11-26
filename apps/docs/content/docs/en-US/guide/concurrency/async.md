---
title: Async functions
description: "async fn, await, blockOn and future: a function that runs as a task, with no executor and no second kind of function."
---

An `async fn` is a function that runs as a task. Calling it starts the body at once and gives a `future<T>`. `await` waits for the result, and `blockOn(future)` does the same from ordinary code such as `main`. There is no executor to choose and no second kind of function: a future is a task handle, and each concurrent call has a stack of its own.

```pelago
async fn double(x: int) -> int { x * 2 }

async fn both() -> int {
    const a = double(4)
    const b = double(5)
    await a + await b
}

fn main() {
    print(blockOn(both()))
}
```

```text
18
```

## Async calls can wait for each other

Because each runs as its own task, two async calls can wait for each other. Here the consumer is started first and waits for what the producer, started second, sends:

```pelago
async fn producer(sink tx: sender<int>) {
    for i of 0..3 { tx.send(i + 1) }
}

async fn consumer(sink rx: receiver<int>) -> int {
    var t = 0
    for v of rx.iter() { t += v }
    t
}

fn main() {
    const (tx, rx) = chan<int>()
    const c = consumer(sink rx)
    const p = producer(sink tx)
    blockOn(p)
    print(blockOn(c))
}
```

```text
6
```

## What the body can use

Because the body runs on a stack of its own, what it uses must move in. A parameter that owns memory is copied into the task, a `sink` parameter is moved, and an `inout` parameter is an error: take the value with `sink` and return what changed.

## Related

- [Tasks](./tasks.md), [Channels](./channels.md)
