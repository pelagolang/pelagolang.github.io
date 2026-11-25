---
title: core
description: "The always-available library: primitive types, collections, text, options and results, tasks, and the interfaces everything else builds on."
---

`core` is the part of the library that needs no `import`. Every name it declares `pub` is in scope in every file, and the methods of its types come with the types, so `xs.sort!()`, `name.toUpper()` and `n.checkedAdd(1)` just work. It is written in Pelago itself, in `compiler/core/core.pel` and the modules under `compiler/core/core/`; the few functions marked `ext` are provided by the backend.

If you are new to this reference, read [How to read this documentation](../index.md#how-to-read-this-documentation) first.

## Modules

| Area | What is in it | Pages |
| --- | --- | --- |
| Primitive types | `bool`, `char`, `int`, `float` | [Primitive types](./primitives/index.md) |
| Wide numbers | `int128`, `uint128`, `int256`, `uint256`, `float16`, `float128`, `float256` | [Wide integers](./wide-integers.md), [Wide and narrow floats](./wide-floats.md) |
| Text | `string` and `str`, `chars`, splitting, searching, parsing | [Strings](./strings.md) |
| Sequences | `list<T>` and the `iter<T>` adapters | [Lists](./lists.md) |
| Keyed collections | `map<K, V>` and `set<T>` | [Maps and sets](./maps-and-sets.md) |
| Absence and failure | `T?` and `T ! E` | [Options and results](./options-and-results.md) |
| Math | The `math` namespace | [Math](./math.md) |

Not yet given their own pages (they exist in the source and are described inside the guide): braids (`core/braid.pel`), tasks and channels (`core/tasks.pel`), boxes, arenas and pools (`core/boxes.pel`, `core/arena.pel`, `core/pool.pel`), and the runtime support in `core/rt.pel`.

## Interfaces

These interfaces are declared in `core` itself. Other types and the language use them.

| Interface | Method | What it enables |
| --- | --- | --- |
| `show` | `fn show(self) -> string` | Printing and `#( )` interpolation. |
| `eq` | `fn eq(self, other: Self) -> bool` | `==` and `!=`. Plain `struct` and `enum` types have it already; an `obj` must say so. |
| `order : eq` | `fn cmp(self, other: Self) -> int` | `<`, `>`, `<=`, `>=`, sorting, `min` and `max`. A negative, zero or positive number. |
| `hash : eq` | `fn hash(self) -> int` | Being a `map` key or a `set` member. |
| `clone` | `fn clone(self) -> Self` | `copy` on an `obj`. Plain data has it already. |
| `converts<E>` | `fn convert(self) -> E` | Lets `?` and `to` turn one error type into another. The name is a placeholder. |
| `add`, `sub`, `mul`, `div`, `rem` | `fn add(self, other: Self) -> Self` and so on | The operators `+`, `-`, `*`, `/`, `%` on your own types. |
| `neg` | `fn neg(self) -> Self` | Unary `-`. |

## Types declared in core

| Type | Meaning |
| --- | --- |
| `parse_error` | A failed text-to-number conversion, with a `message`. It is `show`. |
| `io_error` | A failed file or stream operation: `kind: io_kind` and `message`. |
| `io_kind` | `notFound`, `denied`, `invalid`, `other`. |

## Functions in the prelude

| Function | Signature | Behaviour |
| --- | --- | --- |
| `print` | `fn print(...values: any show)` | Writes the values to standard output with a line end. |
| `assert` | `fn assert(condition: bool)` | Stops the program when the condition is false. |
| `panic` | `fn panic(message: string) -> never` | Stops the program with the message. |
| `todo` | `fn todo() -> never` | Marks code not written yet; stops when reached. |
| `unreachable` | `fn unreachable() -> never` | Marks a place that must not be reached; stops when reached. |

Every stop prints `stopped: <reason>`, with the file and line when known, and ends the program with a non-zero status.
