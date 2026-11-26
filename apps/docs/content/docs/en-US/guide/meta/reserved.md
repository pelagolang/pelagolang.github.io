---
title: Reserved words
description: "unsafe, ext and macro: what they parse as today and what they do not do yet."
---

These words are reserved so that programs written today keep working when the features arrive.

## unsafe

`unsafe { ... }` is a block, and a function can be declared `unsafe fn`. Both parse and run, but the compiler does not yet check anything differently inside them, and calling an `unsafe fn` outside an `unsafe` block is allowed. Do not rely on it as a safety boundary yet.

## ext

`ext fn name(...) -> type` is the planned way to declare a function implemented outside Pelago, for example in a C library. It is parsed, but there is no way to call foreign code yet.

## macro

`macro` is a reserved word with no meaning yet. Compile-time code is written with [`meta`](./meta.md).

## Related

- [Keywords](../../reference/keywords.md), [Compile-time code](./index.md)
