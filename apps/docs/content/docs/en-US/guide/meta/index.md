---
title: Compile-time code and tests
description: "meta for code that runs while compiling, test blocks, and the reserved words unsafe, ext and macro: what works today and what is not finished."
---

This chapter covers the parts of Pelago that are about the build rather than the running program.

| Feature | What it is | State | Page |
| --- | --- | --- | --- |
| `meta fn`, `meta call()` | Run ordinary Pelago code while compiling and use the result as a constant. | Works | [meta](./meta.md) |
| `test "name" { ... }` | A named block of checks. | Parsed and checked; no runner yet | [test](./test.md) |
| `unsafe`, `ext`, `macro` | Reserved for low-level code, foreign functions and macros. | Parsed; little or no meaning yet | [Reserved words](./reserved.md) |

Pelago has no preprocessor and no separate macro language: compile-time code is the same language, written with `meta`.

## Related

- [Keywords](../../reference/keywords.md), [Functions](../functions.md)
