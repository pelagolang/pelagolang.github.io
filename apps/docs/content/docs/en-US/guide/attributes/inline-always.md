---
title: "@inline_always"
description: "@inline_always: copy a function into every call, and the build error for a recursive function."
---

The optimiser inlines small functions by itself. `@inline_always` says to inline this one into every call whatever its size, and fails the build if a call is left.

```pelago frag
@inline_always
fn sq(x: int) -> int = x * x

fn main() { print(sq(4) + sq(3)) }
```

Built and run, it prints:

```text
25
```

## A function that cannot be inlined

A recursive function would be copied forever, so the promise cannot be kept:

```pelago frag
@inline_always
fn f(n: int) -> int = n <= 0 ? 0 : f(n - 1)

fn main() { print(f(3)) }
```

Building it (`pelago build main.pel`) stops with:

```text
main:2:4: error: `f` is `@inline_always` but a call to it is left (it is recursive)
```

## Notes

- The word is `@inline_always`; there is no `@inline`. `inline` is not a keyword.
- Inlining makes the program bigger. Use it for small functions on a hot path.
- Like the other promises, it is judged by `pelago build` and `pelago run`, not `pelago check`.

## Related

- [Attributes](./index.md), [Functions](../functions.md), [Tail calls](../control-flow/tail-calls.md)
