---
title: std.chacha
description: The ChaCha20 and XChaCha20 stream ciphers.
---

```text
import std.chacha
```

ChaCha20 (RFC 8439) and its extended-nonce form XChaCha20. A stream cipher only hides the bytes; it does not detect tampering. **For messages use [std.aead](./aead.md)**, which adds a Poly1305 tag.

| Call | What it does |
| --- | --- |
| `chacha.xor(key, nonce, counter, data)` | Encrypts or decrypts: it is its own inverse. The key is 32 bytes, the nonce 12. |
| `chacha.xorExtended(key, nonce, counter, data)` | The XChaCha20 form with a 24-byte nonce, safe to pick at random. |
| `chacha.block(key, counter, nonce)` | One raw 64-byte keystream block. |

`counter` is the first 64-byte block: 1 for RFC 8439 messages, since block 0 is the one-time Poly1305 key. **Never use one key and nonce for two messages.**

```pelago
import std.chacha
import std.hash

fn main() {
    const key = hash.fromHex("000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f") ?? []
    const nonce = hash.fromHex("000000000000004a00000000") ?? []
    const sealed = chacha.xor(key, nonce, 1, "attack at dawn".bytes().toList())
    print(hash.hex(sealed))
    const back = chacha.xor(key, nonce, 1, sealed)
    print(hash.hex(back) == hash.hex("attack at dawn".bytes().toList()))
}
```

```text
433b25922370f9805bfe430ecf0d
true
```

Only `+%`, `^` and rotations touch the data, so the time does not depend on the data. Checked against the `cryptography` package's ChaCha20 and an independent reference.
