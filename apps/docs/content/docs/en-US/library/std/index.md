---
title: std
description: "The modules you import, grouped by what they do."
---

`std` is a set of modules you import when you need them, for example `import std.fs`. They are grouped here by purpose; each group has its own overview.

## Hashes and checksums

Streaming hashes behind one interface: secure, fast and legacy. [Group overview](./hashes/index.md).

| Module | Purpose |
| --- | --- |
| [`std.hash`](./hashes/hash.md) | The streaming hash interface, hex helpers and a constant-time compare. |
| [`std.sha2`](./hashes/sha2.md) | SHA-224, SHA-256, SHA-384, SHA-512 and the SHA-512/t variants. |
| [`std.sha3`](./hashes/sha3.md) | SHA-3, SHAKE and the original Keccak. |
| [`std.blake2`](./hashes/blake2.md) | BLAKE2b and BLAKE2s, with keys, salts and personalisation. |
| [`std.blake3`](./hashes/blake3.md) | BLAKE3: hash, keyed hash, key derivation and any-length output. |
| [`std.fasthash`](./hashes/fasthash.md) | FNV, xxHash and SipHash for hash tables. Not for security. |
| [`std.legacy`](./hashes/legacy.md) | MD5 and SHA-1, for old formats only. They are broken. |
| [`std.checksum`](./hashes/checksum.md) | CRC-8 to CRC-64 and Adler-32. |

## Keys, MACs and passwords

Message authentication, key derivation and password hashing. [Group overview](./crypto/index.md).

| Module | Purpose |
| --- | --- |
| [`std.mac`](./crypto/mac.md) | HMAC over any hash. |
| [`std.poly1305`](./crypto/poly1305.md) | The Poly1305 one-time MAC. |
| [`std.kdf`](./crypto/kdf.md) | HKDF and PBKDF2 key derivation. |
| [`std.password`](./crypto/password.md) | Argon2 and scrypt, with PHC strings. |
| [`std.bcrypt`](./crypto/bcrypt.md) | bcrypt `$2b$` password hashes. |

## Ciphers and AEAD

Encryption, and authenticated encryption for messages. [Group overview](./ciphers/index.md).

| Module | Purpose |
| --- | --- |
| [`std.chacha`](./ciphers/chacha.md) | ChaCha20 and XChaCha20 stream ciphers. |
| [`std.aead`](./ciphers/aead.md) | ChaCha20-Poly1305 and XChaCha20-Poly1305 authenticated encryption. |

## Random numbers

Replayable generators for tests and games, and secure generators for secrets. [Group overview](./random/index.md).

| Module | Purpose |
| --- | --- |
| [`std.random`](./random/random.md) | Random numbers: from the system, or from a seeded generator you can replay. |
| [`std.csprng`](./random/csprng.md) | A fast cryptographically secure generator for keys, nonces and tokens. |

## Input, output and files

Standard streams, files and paths. [Group overview](./io/index.md).

| Module | Purpose |
| --- | --- |
| [`std.io`](./io/io.md) | Standard input and standard error. |
| [`std.fs`](./io/fs.md) | Read and write files by path. |
| [`std.path`](./io/path.md) | Join, split and clean paths as text. |

## Time

Clocks, durations, sleeping and the calendar. [Group overview](./time/index.md).

| Module | Purpose |
| --- | --- |
| [`std.time`](./time/time.md) | Clocks, durations and sleeping. |
| [`std.calendar`](./time/calendar.md) | Dates, times of day and date-times with no zone. |

## System

The process and its surroundings. [Group overview](./system/index.md).

| Module | Purpose |
| --- | --- |
| [`std.os`](./system/os.md) | The process: arguments and exit status. |
| [`std.env`](./system/env.md) | Environment variables. |

## Text and data formats

Parsing and writing text formats, and pattern matching. [Group overview](./data/index.md).

| Module | Purpose |
| --- | --- |
| [`std.json`](./data/json.md) | Parse and write JSON. |
| [Typed JSON](./data/json-typed.md) | Decode and encode JSON into structs and enums, with renaming and a strict mode. |
| [`std.regex`](./data/regex.md) | Regular expressions. |

## Math

Numbers beyond the built-in types. [Group overview](./math/index.md).

| Module | Purpose |
| --- | --- |
| [`std.big`](./math/big.md) | Integers of any size. |
