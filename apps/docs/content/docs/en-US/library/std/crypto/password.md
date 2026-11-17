---
title: std.password
description: Argon2, scrypt and PHC strings for storing passwords.
---

```text
import std.hash
import std.password
```

Password hashing: Argon2 (RFC 9106) and scrypt (RFC 7914). They are slow and memory hungry on purpose, so guessing passwords costs an attacker as much as it costs you. **Prefer Argon2id for new passwords.** scrypt is here for data that already uses it, and [std.bcrypt](./bcrypt.md) for `$2b$` hashes.

| Call | What it does |
| --- | --- |
| `password.argon2id(pw, salt, time, memory, lanes, length)` | The raw Argon2id key. `time` is the passes, `memory` is in KiB. |
| `password.argon2iKey(...)`, `password.argon2dKey(...)` | The Argon2i and Argon2d variants, same arguments. |
| `password.argon2With(kind, pw, salt, time, memory, lanes, secret, ad, length)` | Every parameter: `kind` is `password.kindD`, `kindI` or `kindID`; `secret` is an optional pepper that is not stored with the hash, `ad` is associated data. |
| `password.scrypt(pw, salt, n, r, p, length)` | The raw scrypt key. `n` is a power of two (32768 or more today), `r` is 8, `p` is 1. |
| `password.argon2Encoded(kind, pw, salt, time, memory, lanes, length)` | The PHC string, `$argon2id$v=19$m=65536,t=3,p=4$<salt>$<tag>`. |
| `password.scryptEncoded(pw, salt, n, r, p, length)` | The scrypt PHC string, `$scrypt$ln=15,r=8,p=1$<salt>$<key>`. |
| `password.verify(pw, encoded)` | True when `pw` is the password behind a stored Argon2, scrypt or bcrypt string. Compares in constant time. |

RFC 9106 suggests 64 MiB, 3 passes, 4 lanes, a 16-byte salt and a 32-byte tag, or 2 GiB and 1 pass where memory allows. Use a new random salt for every password (`random.bytes(16)`). Store the PHC string, which carries the salt and the parameters. The cost comes from the stored string, so do not verify strings an attacker can choose without limiting them first. `verify` gives `false` for a string that is malformed, of another format, or asks for parameters the standards forbid.

The sample uses tiny costs so it runs fast; do not use them for real passwords.

```pelago
import std.hash
import std.password

fn main() {
    const salt = hash.fromHex("000102030405060708090a0b0c0d0e0f") ?? []
    const pw = "hunter2".bytes().toList()
    print(hash.hex(password.argon2id(pw, salt, 2, 64, 1, 16)))
    print(hash.hex(password.scrypt(pw, salt, 16, 8, 1, 16)))
    const stored = password.argon2Encoded(2, pw, salt, 2, 64, 1, 16)
    print(stored)
    print(password.verify("hunter2", stored), password.verify("hunter3", stored))
}
```

```text
56e5c6b7918abb6a7b2ebcdeb190824b
612d27fdc84d873a4b8400cd0a00ee7f
$argon2id$v=19$m=64,t=2,p=1$AAECAwQFBgcICQoLDA0ODw$VuXGt5GKu2p7LrzesZCCSw
true false
```

The functions stop the program on parameters the standards forbid, such as `memory` below `8 * lanes` or an `n` that is not a power of two. `lanes` runs one after the other in this implementation.

Argon2d and the second half of Argon2id read memory at data-dependent places by design, which is what makes them hard on GPUs and why Argon2id is the default. scrypt and Argon2i do not. Checked against `hashlib.scrypt` and the `cryptography` package's Argon2 variants.
