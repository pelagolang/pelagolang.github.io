---
title: "@meta_limit"
description: "@meta_limit(n): set how many steps compile-time code may take for one constant, and the error when it runs out."
---

Code that runs at compile time with [`meta`](../meta/meta.md) is stopped after ten million steps, so a loop that never ends cannot hang the build. `@meta_limit(n)` before a `const` sets a different budget, in steps, for the `meta` call that initialises it.

```pelago
meta fn count() -> int {
    var i = 0
    while i < 50000 { i += 1 }
    i
}

@meta_limit(2000000)
const n = meta count()

fn main() {
    print(n)
}
```

```text
50000
```

## Lowering the limit

A small limit turns a runaway computation into a fast error:

```pelago frag
meta fn count() -> int {
    var i = 0
    while i < 50000 { i += 1 }
    i
}

@meta_limit(500)
const n = meta count()

fn main() {
    print(n)
}
```

Running it stops the build with:

```text
main:8:11: error: compile-time code ran too long (more than 500 steps) (in count)
```

## Notes

- The budget applies to the whole call, including every function it calls.
- It is written on the `const` that holds the result, not on the `meta fn`.

## Related

- [Attributes](./index.md), [meta](../meta/meta.md)
