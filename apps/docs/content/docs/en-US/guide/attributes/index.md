---
title: Attributes
description: "Attributes are @name notes before an item: the ones the compiler acts on today (derive, checkfree, inline_always, leaf) and the library's (json), and what happens to an unknown one."
---

An attribute is a note written before a declaration: `@name`, or `@name(arguments)`. It does not change what the program means. It asks the compiler to generate code (`@derive`) or to check a promise about optimised code (`@checkfree`, `@leaf`, `@inline_always`).

```pelago frag
@derive(show, eq)
struct point { x: int, y: int }

@checkfree
fn sum(xs: [int]) -> int { 0 }
```

| Attribute | On | Effect | Page |
| --- | --- | --- | --- |
| `@derive(show, eq, order, hash, clone)` | `struct`, `enum`, `obj` | Generate the interface implementations. | [derive](./derive.md) |
| `@derive(fromJson, toJson)` | `struct`, `enum` | Generate JSON reading and writing; needs `import std.json`. | [derive](./derive.md), [typed JSON](../../library/std/data/json-typed.md) |
| `@json("key")`, `@json(strict)` | field, `struct`, `enum` | Rename a JSON key; refuse unknown keys. | [typed JSON](../../library/std/data/json-typed.md) |
| `@checkfree` | `fn` | The build fails if an index test is left in the optimised function. | [checkfree](./checkfree.md) |
| `@inline_always` | `fn` | The function is copied into every call; the build fails if a call is left. | [inline_always](./inline-always.md) |
| `@meta_limit(n)` | `const` | Raise the step budget of the compile-time call that initialises it. | [meta_limit](./meta-limit.md) |
| `@leaf` | `fn` | The build fails unless the optimised function makes no calls and keeps no stack slot. | [leaf](./leaf.md) |

## Unknown attributes

An attribute the compiler does not know is an error, and so is a word in `@derive(...)` that cannot be derived. The message lists the valid ones, so a typo cannot turn a promise such as `@checkfree` off by accident:

```pelago error
@bogus
fn f() {}

fn main() {
    f()
}
```

```text
main:1:2: error: unknown attribute `@bogus`; the attributes are `@derive`, `@json`, `@regex`, `@checkfree`, `@inline_always`, `@leaf`, `@meta_limit`
```

```pelago error
@derive(nothing)
struct s { x: int }

fn main() {}
```

```text
main:1:9: error: `nothing` cannot be derived; the derivable words are clone, eq, hash, order, show, fromJson, toJson
```

## The promises are checked on the optimised code

`@checkfree`, `@inline_always` and `@leaf` are judged by `pelago build` after optimisation (and by `pelago run` when it builds machine code). `pelago check` only checks types and names, so it does not report them.

## Related

- [Interfaces in core](../../library/core/interfaces/index.md), [Functions](../functions.md)
