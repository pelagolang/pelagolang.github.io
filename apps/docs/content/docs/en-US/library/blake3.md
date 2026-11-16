---
title: std.blake3
description: BLAKE3, a fast tree hash with keyed mode, key derivation and any-length output.
---

```text
import std.blake3
import std.hash
import { blake3hash } = std.blake3
```

BLAKE3 is a fast, secure hash with a tree structure. It is a [`hasher`](./hash.md) and the same hash [Islet](https://github.com/pelagolang/islet) uses for its store. The type is `blake3hash`.

| Make one | Mode |
| --- | --- |
| `blake3hash.new()` | plain hash |
| `blake3hash.keyed(key)` | a MAC with a 32-byte key, no HMAC needed |
| `blake3hash.deriveKey(context)` | a key derivation function; the context string should be hard-coded and unique to your application |

`finish` gives the usual 32 bytes. `squeeze(n)` gives any number of bytes, and the 32-byte digest is the start of the longer output.

```pelago
import std.blake3
import std.hash
import { blake3hash } = std.blake3

fn main() {
    print(hash.hex(hash.digestText(blake3hash.new(), "abc")))
    var h = blake3hash.deriveKey("my app 2026-11-12 session keys")
    h.update!("master secret".bytes().toList())
    print(hash.hex(h.squeeze(48)))
}
```

```text
6437b3ac38465133ffb63b75273a8db548c558465d79db03fd359c6cd5bd9d85
73ef08d7a72cc41ef6b5b83c45157a0162dc78cd431e0e9902a198a39433df78cc6ce8466f266d497a144dedb6bb4c29
```

The tree is built one chunk at a time, serially: there is no SIMD and no threads yet, though the tree shape allows both later. Only `+%`, `^` and rotations touch the data, and the tree shape depends on the length only. Checked against the published vectors and a corpus from an independent Python port of the specification.
