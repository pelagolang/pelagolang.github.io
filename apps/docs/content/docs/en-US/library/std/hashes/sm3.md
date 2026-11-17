---
title: std.sm3
description: "SM3, the Chinese national standard hash (GB/T 32905-2016): 32-byte digest."
---

```text
import std.hash
import std.sm3
import { sm3hash } = std.sm3
```

SM3 (GB/T 32905-2016, ISO/IEC 10118-3:2018) is the Chinese national standard hash. It has a 32-byte digest and a design close to SHA-256 with a different message expansion. It is a [`hasher`](./hash.md).

```pelago
import std.hash
import std.sm3
import { sm3hash } = std.sm3

fn main() {
    print(hash.hex(hash.digestText(sm3hash.new(), "abc")))
    print(sm3hash.new().outputSize(), sm3hash.new().blockSize())
}
```

```text
66c7f0f462eeedd9d1f2d46bdc10e4e24167c4875cf2f7a2297da02b8f4ba8e0
32 64
```

Use it where a Chinese standard or a protocol (TLS 1.3 `sm3`, GmSSL) asks for it; otherwise use [std.sha2](./sha2.md) or [std.sha3](./sha3.md). The type is `sm3hash` because a module and its type must have different names. It runs in constant time. Digests are checked against Python's `hashlib.new("sm3")`.
