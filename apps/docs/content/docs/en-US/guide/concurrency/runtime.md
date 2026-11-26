---
title: The runtime
description: "How tasks run: stacks, parking and deadlock reports, ending the program, and what is not finished."
---

## Stacks

Every task, and every coroutine, runs on its own stack of 256 KiB, taken from a pool and reused. A page that cannot be accessed sits below each stack, so a task that recurses too deeply stops the program instead of overwriting other memory.

## Parking and deadlocks

A task that waits on a channel, lock, semaphore or barrier is parked, not polling. If every task is parked and nothing can wake one, the program stops with a deadlock report instead of hanging:

```text
deadlock: waiting for a value that nobody can provide
deadlock: waiting for a task to finish that nobody can provide
```

## Ending the program

Returning from `main` ends the program. A task that was started with a plain `spawn` and never joined is abandoned at that point: it does not keep running after `main`. Join what you need, or start it inside a `scope`, which always waits.

## Not finished

Tasks are scheduled one at a time today. The runtime can start operating system threads and wait on futexes on Linux (x86-64 and AArch64), but the scheduler does not yet spread tasks over several threads, so a program does not run faster by spawning more tasks, and the other systems are catching up.

## Related

- [Tasks](./tasks.md), [Channels](./channels.md), [Cleanup](../ownership/cleanup.md)
