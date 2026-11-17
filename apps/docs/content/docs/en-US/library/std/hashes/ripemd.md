---
title: std.ripemd
description: "RIPEMD-160, the one still in use (Bitcoin addresses, some PGP keys), and RIPEMD-128, 256 and 320."
---

```text
import std.hash
import std.ripemd
import { rmd } = std.ripemd
```

The RIPEMD family (Dobbertin, Bosselaers and Preneel, 1996). Each one is a [`hasher`](./hash.md), so the usual `update!`, `finish`, `digest` and `hex` work.

| Make one | Digest | Block | Notes |
| --- | --- | --- | --- |
| `rmd.r160()` | 20 bytes | 64 | RIPEMD-160. No known attack; fine where a format needs it. |
| `rmd.r128()` | 16 bytes | 64 | Too short to resist collisions today. |
| `rmd.r256()` | 32 bytes | 64 | The same security as 128 with a wider output, not stronger. |
| `rmd.r320()` | 40 bytes | 64 | The same security as 160 with a wider output, not stronger. |

```pelago
import std.hash
import std.ripemd
import { rmd } = std.ripemd

fn main() {
    print(hash.hex(hash.digestText(rmd.r160(), "abc")))
    print(hash.hex(hash.digestText(rmd.r128(), "abc")))
    print(hash.hex(hash.digestText(rmd.r256(), "abc")))
    print(hash.hex(hash.digestText(rmd.r320(), "abc")))
    print(rmd.r160().outputSize(), rmd.r160().blockSize(), rmd.r320().outputSize())
}
```

```text
8eb208f7e05d987a9b044a8e98c6b087f15a0bfc
c14a12199c66e4ba84636b0f69144c77
afbd6e228b9d8cbbcef5ca2d03e6dba10ac0bc7dcbe4680e1e42d2e975459b65
de4c01b3054f8930a79d09ae738e92301e5a17085beffdc1b8d116713e74f82fa942d64cdbc4682d
20 64 40
```

For anything new use [std.sha2](./sha2.md), [std.sha3](./sha3.md) or [std.blake2](./blake2.md). RIPEMD-160 is here because existing formats ask for it. RIPEMD-160 digests are checked against Python's `hashlib`; the other three against an independent reference that reproduces the published values for "abc".
