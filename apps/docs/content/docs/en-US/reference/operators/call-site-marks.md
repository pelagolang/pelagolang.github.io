---
title: Call-site marks
description: "inout, sink, ! and !! at a call, and copy: how a call says what happens to its arguments."
---

| Mark | Where | Meaning |
| --- | --- | --- |
| `inout` | argument | The callee changes this variable. |
| `sink` | argument | The callee takes this value. |
| `!` | after a method name | The method changes its receiver. |
| `!!` | after a method name | The method consumes its receiver. |
| `copy` | prefix | Make an independent copy instead of moving. |

The marks are repeated at the call site on purpose, so a reader sees which calls change or consume a value. Each one has a page in the ownership guide:

- [Inout](../../guide/ownership/inout.md)
- [Sink](../../guide/ownership/sink.md)
- [Values and copies](../../guide/ownership/values-and-copies.md)
