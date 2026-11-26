---
title: Control flow
description: "Choosing and repeating: if, unless, while, for, loop, break and continue, guard, defer and tail calls, one page each."
---

| Feature | What it does | Page |
| --- | --- | --- |
| `if`, `else`, `?:` | Choose between branches; `if` is also an expression. | [if and else](./if-else.md) |
| `unless` | `if` with the condition turned around. | [unless](./unless.md) |
| `while` | Repeat while a condition holds. | [while](./while.md) |
| `for` | Walk a range, a list, a map, a string or any iterator. | [for](./for.md) |
| `a..b` | Ranges, `step`, and what they can and cannot do. | [Ranges](./ranges.md) |
| `loop` | Repeat until `break`; the only loop that gives a value. | [loop](./loop.md) |
| `break`, `continue`, labels | Leave or skip, including outer loops. | [break, continue and labels](./break-continue.md) |
| `guard` | Check a condition up front and leave early. | [guard](./guard.md) |
| `defer` | Run code when the scope ends. | [defer](./defer.md) |
| `become` | A guaranteed tail call. | [Tail calls](./tail-calls.md) |

Pattern matching with `switch` and `is` has its own chapter: [Pattern matching](../switch/index.md).

Every condition must be a [`bool`](../../library/core/primitives/bool.md). There is no truthy or falsy value: `if n { ... }` with an `int` is an error.
