---
title: Faults
description: "What stops a program, what a stop prints, and why it cannot be caught."
---

The following stop the program: integer overflow, division or remainder by zero, an index or slice outside a list, a failed `assert`, and a call to `panic`. A stop writes `<file>:<line>: stopped: <reason>` to standard error (the source file and the line of the failed check) and ends the process with status 1.

Stops cannot be caught and do not unwind. `deinit` does not run for values still alive, and a `defer` does not run.

An error that a caller may reasonably handle is a `result`, not a stop. See [Error handling](../../guide/errors.md).

## Related

- [Arithmetic](../operators/arithmetic.md)
- [Functions](../declarations/functions.md) for `never`
