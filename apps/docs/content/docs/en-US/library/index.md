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
