---
title: std.blake2
description: BLAKE2b and BLAKE2s, fast secure hashes with built-in keys.
---

```text
import std.blake2
import std.hash
import { blake2b, blake2s } = std.blake2
```

BLAKE2 (RFC 7693) is as secure as SHA-3 and faster than SHA-2. Both are [`hasher`](./hash.md)s, and keying, a salt and a personalisation string are part of the algorithm, so a keyed BLAKE2 is already a MAC and needs no HMAC.

| Hash | Words | Digest | Best on |
| --- | --- | --- | --- |
| `blake2b` | 64-bit | 1 to 64 bytes | 64-bit machines |
| `blake2s` | 32-bit | 1 to 32 bytes | small machines |

Make one with `blake2b.new(size)`, `blake2b.keyed(size, key)` or `blake2b.custom(size, key, salt, personal)`. `blake2s` has the same three. The digest length is part of the hash: BLAKE2b with 32 bytes is not BLAKE2b-512 cut short.

```pelago
import std.blake2
import std.hash
import { blake2b, blake2s } = std.blake2

fn main() {
    print(hash.hex(hash.digestText(blake2b.new(32), "abc")))
    print(hash.hex(hash.digestText(blake2s.new(32), "abc")))
    const tag = hash.digestText(blake2b.keyed(32, "secret key".bytes().toList()), "message")
    print(hash.hex(tag))
}
```

```text
bddd813c634239723171ef3fee98579b94964e3bb1cb3e427262c8c068d52319
508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982
f71324f0d1339cc29166e351477087fdabee524aea02eb2ff2b79f52eeaea4e4
```

Only `+%`, `^` and rotations touch the data, so the time does not depend on what is hashed. Checked against Python's `hashlib.blake2b` and `blake2s`, including keys, salts and personalisation. Argon2, which is built on BLAKE2b, is planned.
