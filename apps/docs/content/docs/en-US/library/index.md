---
title: Standard library
description: "What comes with Pelago: the always-available core and the std modules you import."
---

The library has two parts.

**[`core`](./core/index.md)** is always available. It provides the collection types, text, numbers, options and results, and tasks. Their methods come with the types, so nothing is imported to call `xs.sort!()` or `name.toUpper()`.

**[`std`](./std/index.md)** is a set of modules you import when you need them. They are grouped by purpose:

- [Hashes and checksums](./std/hashes/index.md): Streaming hashes behind one interface: secure, fast and legacy.
- [Keys and MACs](./std/crypto/index.md): Message authentication and key derivation.
- [Input, output and files](./std/io/index.md): Standard streams, files and paths.
- [Time](./std/time/index.md): Clocks, durations and sleeping.
- [System](./std/system/index.md): The process and its surroundings, and random numbers.
- [Text and data formats](./std/data/index.md): Parsing and writing text formats, and pattern matching.
- [Math](./std/math/index.md): Numbers beyond the built-in types.
