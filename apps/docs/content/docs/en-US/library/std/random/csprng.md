---
title: std.csprng
description: A fast cryptographically secure random generator seeded from the system.
---

```text
import { csrng } = std.csprng
```

A cryptographically secure generator: ChaCha20 with fast key erasure, seeded from the system. Use it, not the replayable `rng` of [std.random](./random.md), whenever the numbers protect something: keys, nonces, tokens and salts. `random.bytes` is the system's generator itself; `csrng` is the same quality but cheap to call many times.

| Call | What it does |
| --- | --- |
| `csrng.fromSystem()?` | Seeds from the system with one call; fails with an `io_error`. |
| `csrng.fromKey(key)` | Starts from a 32-byte key, for tests and repeatable streams from a secret. The same bytes on every target. |
| `g.bytes!(n)` | `n` random bytes. |
| `g.word!()` | One random whole number. |
| `g.between!(lo, hi)` | A whole number from `lo` to `hi`, without bias. |

The state is a 32-byte key. Each refill makes a 64-byte ChaCha20 block and the first half replaces the key at once, so a later leak of the state cannot reveal earlier output. A `csrng` is a value: if you copy one, both copies produce the same numbers, so do not copy one that must stay secret.

```pelago
import std.hash
import { csrng } = std.csprng

fn main() -> void ! io_error {
    var g = csrng.fromSystem()?
    const die = g.between!(1, 6)
    print(die >= 1 && die <= 6)
    print(g.bytes!(32).len())
    var a = csrng.fromKey(hash.fromHex("0505050505050505050505050505050505050505050505050505050505050505") ?? [])
    var b = csrng.fromKey(hash.fromHex("0505050505050505050505050505050505050505050505050505050505050505") ?? [])
    print(hash.hex(a.bytes!(8)) == hash.hex(b.bytes!(8)))
}
```

```text
true
32
true
```
