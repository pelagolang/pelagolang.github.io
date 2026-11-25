---
title: Standard library
description: "What comes with Pelago: the always-available core and the std modules you import."
---

The library has two parts.

**[`core`](./core/index.md)** is always available. It provides the collection types, text, numbers, options and results, and tasks. Their methods come with the types, so nothing is imported to call `xs.sort!()` or `name.toUpper()`.

**[`std`](./std/index.md)** is a set of modules you import when you need them. They are grouped by purpose:

- [Hashes and checksums](./std/hashes/index.md): Streaming hashes behind one interface: secure, fast and legacy.
- [Keys, MACs and passwords](./std/crypto/index.md): Message authentication and key derivation.
- [Ciphers and AEAD](./std/ciphers/index.md): Encryption, and authenticated encryption for messages.
- [Random numbers](./std/random/index.md): Replayable generators for tests and games, and secure generators for secrets.
- [Input, output and files](./std/io/index.md): Standard streams, files and paths.
- [Time](./std/time/index.md): Clocks, timers, the calendar, time zones and text forms.
- [System](./std/system/index.md): The process and its surroundings.
- [Text and data formats](./std/data/index.md): Parsing and writing text formats, and pattern matching.
- [Math](./std/math/index.md): Numbers beyond the built-in types.

## How to read this documentation

Every page in the library follows one shape, so you can find things without reading everything.

**The two parts.** [`core`](./core/index.md) is always in scope. [`std`](./std/index.md) is a set of modules you bring in with `import std.name`. Inside a page, a type or module is described from the top down: what it is, how a value is made, the operators, the methods, what happens at the edges, what is not finished, and related pages.

**Method tables.** Each row names a method, its result type and what it does. `self` is the receiver. A method that changes its receiver is written with `!` at the call, as in `xs.push!(1)`; one that consumes it uses `!!`. Both marks appear at the call site too, so the page tells you what a call can do before you read the body.

**Types in signatures.**

| Written | Meaning |
| --- | --- |
| `T?` | A `T` or `none`. |
| `T ! E` | A `T` or an error of type `E`, used with `ok`, `err` and `?`. |
| `[T]`, `list<T>` | A growable list. |
| `str` and `string` | A view of text and owned text. A `string` is accepted where a `str` is wanted. |
| `iter<T>` | A lazy sequence of `T`. |
| `never` | The function does not return. |
| `any show` | Any value that implements the interface `show`. |

**How a call can fail.** Pelago has no exceptions, and each failing operation says which of three ways it uses:

1. It returns an option or a result: `get`, `parseInt`, `checkedAdd`. You handle it with `switch`, `??` or `?`.
2. It stops the program: an integer overflow, a division by zero, an index out of range, `panic`. The page names the message, which starts `stopped:`.
3. It cannot fail, so the type says so.

**Examples.** A block marked `pelago` is a complete program, and the block that follows is its exact output. Every one is compiled and run by the site's tests against the current compiler, so what you read is what happens. Where something is accepted by the checker but not yet generated, the page says so under *Not finished* rather than leaving it out.

**Platforms.** Behaviour is meant to be the same on the interpreter and on every native target unless a page says otherwise. Pages for the file system, clocks, environment and process list what differs per platform.

**Names.** Types are lowercase. A std module is written `std.name`. Nested module paths such as `std.collections.deque` are planned; when a module gets one, its page names both spellings, because the flat name stays. Names that start `rt` belong to the runtime and are not part of the public interface.
