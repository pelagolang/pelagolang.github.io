---
title: "@leaf"
description: "@leaf: a promise that a function makes no calls and keeps no stack slot, so it needs no frame."
---

A leaf function does its work in registers: after optimisation it calls nothing and uses no stack. The code generator then emits it without a frame. `@leaf` states that promise, and the build fails if it does not hold.

```pelago frag
@leaf
fn add(a: int, b: int) -> int = a + b

fn main() { print(add(1, 2)) }
```

Built and run, it prints:

```text
3
```

## When the promise fails

```pelago frag
@leaf
fn f(n: int) -> int {
    print(n)
    n
}

fn main() { print(f(1)) }
```

Building it (`pelago build main.pel`) stops with:

```text
main:2:4: error: `f` is `@leaf` but makes a call or keeps a stack slot
```

`print` is a call, so `f` is not a leaf.

## Related

- [Attributes](./index.md), [@inline_always](./inline-always.md), [@checkfree](./checkfree.md)
