---
title: Values and access modes
description: "One owner per value, moves, temporary references and the three access modes."
---

Every value has exactly one owner. Assigning, passing with `sink` or returning a value moves it, and a moved name cannot be used again. `copy` makes an independent duplicate. Plain numbers, `bool` and `char` are copied implicitly because moving them would be indistinguishable.

Two names never refer to the same changeable value, so a change is visible only through the name it was made through.

## References are temporary

A parameter passed by `let` (the default) or `inout` is a temporary reference that lasts for the call. Such a reference cannot be stored, returned or captured past its use, which is why no lifetime annotations exist.

## Access modes

| Mode | Callee may | Caller afterwards |
| --- | --- | --- |
| `let` | Read. | Unchanged. |
| `inout` | Read and change. | Sees the changes. |
| `sink` | Keep or consume. | No longer has the value. |

At a call the marks `inout` and `sink` are written on the argument. A method that changes its receiver is called with `!` and one that consumes it with `!!`. Omitting a required mark is an error.

## Related

- [Ownership guide](../../guide/ownership/index.md)
- [Call-site marks](../operators/call-site-marks.md)
