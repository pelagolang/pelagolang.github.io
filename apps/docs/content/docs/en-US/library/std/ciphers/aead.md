---
title: std.aead
description: ChaCha20-Poly1305 and XChaCha20-Poly1305 authenticated encryption.
---

```text
import std.aead
```

Authenticated encryption: the message is hidden and any change to it is detected. These are ChaCha20-Poly1305 (RFC 8439) and XChaCha20-Poly1305.

| Call | What it does |
| --- | --- |
| `aead.seal(key, nonce, plain, aad)` | Returns the ciphertext followed by a 16-byte tag. Key 32 bytes, nonce 12. |
| `aead.open(key, nonce, sealed, aad)` | Returns the plain bytes, or `none` when the tag does not match. |
| `aead.sealExtended`, `aead.openExtended` | The XChaCha20 forms, with a 24-byte nonce. |

`aad` is extra data that is checked but not hidden, such as a header or an id; pass `[]` for none. `open` gives `none` for any change to the nonce, the associated data or the sealed bytes, the tag is compared in constant time, and nothing is decrypted before it matches.

**Never seal two messages with the same key and nonce.** With 12-byte nonces, count them. With 24-byte nonces, pick each at random (for example with `random.bytes(24)`).

```pelago
import std.aead
import std.hash

fn main() {
    const key = hash.fromHex("0707070707070707070707070707070707070707070707070707070707070707") ?? []
    const nonce = hash.fromHex("000000000000000000000000") ?? []
    const header = "header".bytes().toList()
    const sealed = aead.seal(key, nonce, "meet at noon".bytes().toList(), header)
    print(sealed.len())
    print(hash.hex(sealed))
    switch aead.open(key, nonce, copy sealed, header) {
        case some(plain): print(hash.hex(plain) == hash.hex("meet at noon".bytes().toList()))
        case none: print("rejected")
    }
    var bad = copy sealed
    bad[0] = bad[0] ^ 1
    print(aead.open(key, nonce, bad, header))
    print(aead.open(key, nonce, copy sealed, "other".bytes().toList()))
}
```

```text
28
5ae14c78400a70ddae1d6b6e801c2480bbdaa4cb90a8f3f0ebc9813c
true
none
none
```

Checked against the `cryptography` package's ChaCha20Poly1305 and an independent reference.
