---
title: test
description: "test blocks: naming checks inside the source file, what the compiler does with them today, and assert."
---

A `test` block is a named group of checks written next to the code it checks:

```pelago frag
test "addition works" {
    assert(1 + 1 == 2)
}
```

`assert(condition)` is in the prelude and stops the program when the condition is false.

## What works today

The compiler parses `test` blocks, resolves names in them and checks their types, so a test that does not compile is reported with the rest of the file. `test` is a soft keyword: it starts a test only when a string follows it, so `test` is still a fine name for a variable.

## Not finished

There is no test runner yet: `pelago` has no `test` command, and a program built or run does not execute its `test` blocks. Until it exists, write checks as ordinary functions with `assert` and call them from a small `main`.

## Related

- [Compile-time code](./index.md), [Errors](../errors.md)
