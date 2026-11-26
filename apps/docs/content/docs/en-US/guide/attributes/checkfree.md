---
title: "@checkfree"
description: "@checkfree: a promise that the optimised function has no index tests left, and how to write a loop the compiler can prove."
---

Indexing a list stops the program when the index is out of range, so every `xs[i]` carries a test. The optimiser removes the tests it can prove are not needed. `@checkfree` before a function makes the build fail if any test is left, so a function that must run at full speed cannot quietly lose it after an edit.

```pelago frag
@checkfree
fn sum(xs: [int]) -> int {
    var s = 0
    for i in 0..xs.len() { s += xs[i] }
    s
}

fn main() { print(sum([1, 2, 3])) }
```

Built and run, it prints:

```text
6
```

Here the loop runs `i` over `0..xs.len()`, so the optimiser proves every `xs[i]` in range.

## When the test cannot be removed

```pelago frag
@checkfree
fn at(xs: [int], i: int) -> int = xs[i]

fn main() { print(at([1, 2], 1)) }
```

Building it (`pelago build main.pel`) stops with:

```text
main:2:4: error: `at` is `@checkfree` but keeps 1 index test(s) the optimiser could not prove
```

Nothing is known about `i`, so the test stays, and the attribute turns that into a build error. Walk the list with `for x of xs`, loop over `0..xs.len()`, or check the index yourself first.

## Notes

- The function is kept as a function of its own: it is never inlined into callers.
- It is judged on the optimised code, so it needs `pelago build` or `pelago run` with optimisation (the default). `--no-opt` leaves every test in place.
- The attribute checks **index tests only**. Overflow checks on arithmetic are not affected: they keep their exact stop semantics.

## Related

- [Attributes](./index.md), [for](../control-flow/for.md), [List](../../library/core/collections/list.md)
