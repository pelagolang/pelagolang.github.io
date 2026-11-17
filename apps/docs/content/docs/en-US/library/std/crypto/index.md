---
title: Keys, MACs and passwords
description: "Message authentication, key derivation and password hashing."
---

Message authentication, key derivation and password hashing.

| Module | Purpose |
| --- | --- |
| [`std.mac`](./mac.md) | HMAC over any hash. |
| [`std.poly1305`](./poly1305.md) | The Poly1305 one-time MAC. |
| [`std.kdf`](./kdf.md) | HKDF and PBKDF2 key derivation. |
| [`std.password`](./password.md) | Argon2 and scrypt, with PHC strings. |
| [`std.bcrypt`](./bcrypt.md) | bcrypt `$2b$` password hashes. |
