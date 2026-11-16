---
title: std.sha3
description: SHA3-224/256/384/512, SHAKE128 and SHAKE256, and the original Keccak.
---

```text
import std.hash
import std.sha3
import { keccak } = std.sha3
```

SHA-3 (FIPS 202) is built on the Keccak sponge. Each variant is a [`hasher`](./hash.md), so `update!`, `finish`, `digest` and `hex` work as they do for [SHA-2](./sha2.md).

| Make one | What it is | Digest |
| --- | --- | --- |
| `keccak.sha3(224)` | SHA3-224 | 28 bytes |
| `keccak.sha3(256)` | SHA3-256 | 32 bytes |
| `keccak.sha3(384)` | SHA3-384 | 48 bytes |
| `keccak.sha3(512)` | SHA3-512 | 64 bytes |
| `keccak.original(256)` or `(512)` | Keccak-256 or Keccak-512 with the original padding, the one Ethereum uses | 32 or 64 bytes |
| `keccak.shake(128, n)` or `(256, n)` | SHAKE128 or SHAKE256, an extendable-output function; `n` is the default digest length | `n` bytes |

SHA3-256 and Keccak-256 differ only in the padding byte, so they give different digests for the same input.

A SHAKE can give you as many bytes as you ask for. Call `squeeze(n)` after feeding it data. The state is a plain value, so `squeeze` and `finish` work on a copy: the hasher stays usable, and each `squeeze` starts from the beginning of the output.

```pelago
import std.hash
import std.sha3
import { keccak } = std.sha3

fn main() {
    print(hash.hex(hash.digestText(keccak.sha3(256), "abc")))
    print(hash.hex(hash.digestText(keccak.original(256), "abc")))
    var x = keccak.shake(128, 32)
    x.update!("abc".bytes().toList())
    print(hash.hex(x.squeeze(40)))
}
```

```text
3a985da74fe225b2045c172d6bd390bd855f086e3e9d525b46bfe24511431532
4e03657aea45a94fc7d47ba826c8d667c0d1e6e33a64a036ec44f58fa12d6c45
5881092dd818bf5cf8a3ddb793fbcba74097d5c526a6d35f97b83351940f2cc844c50af32acd3f2c
```

Only `^`, `&`, `~` and rotations touch the data, with no table lookup or branch that depends on it, so the time does not depend on what is hashed. Every digest is checked against Python's `hashlib`.

## What is not there yet

cSHAKE, KMAC, TupleHash, ParallelHash (SP 800-185) and KangarooTwelve.
