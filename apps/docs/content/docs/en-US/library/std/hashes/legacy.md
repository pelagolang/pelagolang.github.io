---
title: std.legacy
description: MD5, SHA-1 and MD4, for old formats only. All are broken.
---

```text
import std.hash
import std.legacy
import { md5, sha1, md4 } = std.legacy
```

**MD5, SHA-1 and MD4 are broken. Never use them to protect anything.**

Both have practical collision attacks (MD5 since 2004, SHA-1 since SHAttered in 2017): an attacker can build two different inputs with the same digest. Do not use them for signatures, certificates, password hashing or any check against an attacker. Use [std.sha2](./sha2.md) or [std.sha3](./sha3.md).

They are here because old file formats, git object ids, download checksums and some protocols still use them. Each is a [`hasher`](./hash.md), so the usual calls work.

| Make one | Digest |
| --- | --- |
| `md5.new()` | 16 bytes |
| `sha1.new()` | 20 bytes |
| `md4.new()` | 16 bytes |

```pelago
import std.hash
import std.legacy
import { md5, sha1 } = std.legacy

fn main() {
    print(hash.hex(hash.digestText(md5.new(), "abc")))
    print(hash.hex(hash.digestText(sha1.new(), "abc")))
}
```

```text
900150983cd24fb0d6963f7d28e17f72
a9993e364706816aba3e25717850c26c9cd0d89d
```

As a keyed MAC, HMAC-MD5 and HMAC-SHA1 are still unbroken, which is why they work with [std.mac](../crypto/mac.md). Digests are checked against Python's `hashlib`.

## MD4

MD4 (RFC 1320) is broken far worse than MD5: collisions take a fraction of a second. It is here only because NTLM hashes, rsync and eDonkey still use it.

```pelago
import std.hash
import std.legacy
import { md4 } = std.legacy

fn main() {
    print(hash.hex(hash.digestText(md4.new(), "abc")))
    print(hash.hex(hash.digestText(md4.new(), "")))
}
```

```text
a448017aaf21d8525fc10ae87aa6729d
31d6cfe0d16ae931b73c59d7e0c089c0
```

MD2 is planned.
