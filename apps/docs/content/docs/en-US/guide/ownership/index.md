---
title: Ownership and memory
description: "Value semantics, moves, copies, access modes, cleanup and boxes: how Pelago manages memory with no garbage collector and no borrow checker."
---

Pelago has no garbage collector and no borrow checker. Every value has exactly one owner, values never share mutable state, and memory is released at a point you can read in the source. This chapter has one page per idea.

| Idea | What it answers | Page |
| --- | --- | --- |
| Value semantics, `copy` | What does `b = a` do? When do I get two values? | [Values and copies](./values-and-copies.md) |
| Moves | Which assignments give a value away, and what the compiler says if you use it again. | [Moves](./moves.md) |
| Read access | The default parameter mode: look, do not touch. | [Read access](./read-access.md) |
| `inout` and `x!` | Change the caller's variable in place. | [inout](./inout.md) |
| `sink` and `x!!` | Take the value away from the caller. | [sink](./sink.md) |
| `deinit`, scope exit, `--leak-check` | When values are released and how to run code at that moment. | [Cleanup](./cleanup.md) |
| `box<T>` | A value on the heap: recursive types and indirection. | [Boxes](./box.md) |
| `defer` | Run a statement when a block ends. | [defer](../control-flow/defer.md) |

## The rules in one place

1. A name owns its value. Two names never own the same value.
2. Plain data (numbers, `bool`, `char`, and structs and tuples made only of them) is copied by assignment. Data that owns memory (strings, lists, maps, boxes, and anything containing them) is **moved** by assignment.
3. A parameter is one of three modes: read (the default), `inout` or `sink`. The call repeats `inout` and `sink` (or the marks `!` and `!!`), so the effect of a call is visible without opening the function.
4. References exist only for the length of a call or statement. They cannot be stored, returned or captured, which is why there are no lifetime annotations.
5. A value is released when its owner goes out of scope, running its `deinit` if it has one. Nothing else frees memory.

Because two names never share one mutable value, a function cannot change your data behind your back, and tasks cannot race on it. See [Concurrency](../concurrency/index.md).

## Where this shows up elsewhere

- Method marks follow the same idea: `xs.push!(1)` changes the receiver, `task.join!!()` uses it up. See [Functions](../functions.md).
- Closures list their captures with the same marks. See [Functions](../functions.md).
- Wrong use is caught at compile time with a message naming the line and the fix. Each page below shows the exact text.
