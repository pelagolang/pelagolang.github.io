---
title: std.fasthash
description: FNV, xxHash and SipHash, fast hashes for tables and caches. Not for security.
---

```text
import std.fasthash
import std.hash
import { fnv, siphash, xxh32, xxh64 } = std.fasthash
```

**These are not for security.** They are for hash tables, caches and finding duplicates. Each is a [`hasher`](./hash.md), and `value()` gives the number as a `uint64`.

| Make one | What it is |
| --- | --- |
| `fnv.fnv1a32()`, `fnv.fnv1a64()` | FNV-1a, 32 and 64 bit: one multiply and one xor per byte |
| `fnv.fnv132()`, `fnv.fnv164()` | FNV-1 |
| `xxh32.new(seed)`, `xxh64.new(seed)` | xxHash, seedable |
| `siphash.new24(key)`, `siphash.new13(key)` | SipHash-2-4 (the standard) and SipHash-1-3 (faster), with a 16-byte key |

None of these resists an attacker who can choose the input, except **SipHash**: it is a keyed function made so a hash table can survive hostile keys. When keys come from outside, use it with a random key from `random.bytes(16)`. It is still not a collision-resistant hash.

The digest of FNV and xxHash is the number in big-endian bytes, which is xxHash's canonical form. SipHash's is little-endian, as in the paper.

```pelago
import std.fasthash
import std.hash
import { fnv, siphash, xxh64 } = std.fasthash

fn main() {
    var x = xxh64.new(0)
    x.update!("Nobody inspects the spammish repetition".bytes().toList())
    print(hash.hex(x.finish()))
    var f = fnv.fnv1a64()
    f.update!("hello".bytes().toList())
    print(hash.hex(f.finish()))
    const key = hash.fromHex("000102030405060708090a0b0c0d0e0f") ?? []
    var s = siphash.new24(key)
    s.update!("hello".bytes().toList())
    print(hash.hex(s.finish()))
}
```

```text
fbcea83c8a378bf1
a430d84680aabd0b
81df675798b34f00
```

Checked against the published values and a Python port of each specification.

## What is not there yet

XXH3 and XXH128, MurmurHash3, wyhash, CityHash and HighwayHash.
