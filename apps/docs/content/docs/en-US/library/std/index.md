---
title: std
description: "The modules you import, grouped by what they do: how to use them, what is in scope without an import, and the conventions they share."
---

`std` is a set of modules you import when you need them, for example `import std.fs`. Everything in [`core`](../core/index.md) (the primitive types, lists, maps, text, options and results) is already in scope; `std` adds what needs the operating system or a larger algorithm.

New to this reference? Start with [How to read this documentation](../index.md#how-to-read-this-documentation).

## Using a module

```pelago
import std.path

fn main() {
    print(path.join("src", "main.pel"))
}
```

```text
src/main.pel
```

An `import` gives you the module's name as a namespace: `import std.fs` makes `fs.readText(...)` available. Only names the module declares `pub` can be used. Importing a module twice is harmless.

## What is in scope without an import

The "prelude" of Pelago is everything `core` declares `pub`:

- the types `bool`, `char`, `int` and its widths, `float` and its widths, `string`, `str`, `list`, `map`, `set`, `range`, `box`, `iter` and the option and result forms `T?` and `T ! E`;
- the interfaces `show`, `eq`, `order`, `hash`, `clone`, the operator interfaces and `converts`;
- `parse_error`, `io_error`, `io_kind`;
- `print`, `assert`, `panic`, `todo`, `unreachable`;
- the `math` namespace.

Nothing from `std` is in scope until you import it.

## Conventions

- **Failure.** A function that can fail for reasons outside your program (a missing file, bad input) returns a result, such as `string ! io_error`, and never stops the program. A function that can only fail because the caller broke a rule (an index out of range) stops the program. Each page says which.
- **Streaming.** Hashes, MACs, ciphers and generators are values you create, feed and finish, and every module also has one-shot helpers for the common case.
- **Bytes.** Binary data is `[uint8]` (`byte`). Text is `string` or `str`, and hex helpers live in `std.hash`.
- **Names.** Functions are camelCase, types are lowercase, modules are one lowercase word. Modules sit in a flat namespace today (`std.sha2`); nested paths such as `std.collections.deque` are planned and the flat names will stay as aliases.
- **Secrets.** Modules that handle keys say whether a comparison is constant time, and which algorithms are broken (`std.legacy`).

The groups below match `pelago std`, which lists the same tree.

## Hashes and checksums

Streaming hashes behind one interface: secure, fast and legacy. [Group overview](./hashes/index.md).

| Module | Purpose |
| --- | --- |
| [`std.hash`](./hashes/hash.md) | The streaming hash interface, hex helpers and a constant-time compare. |
| [`std.sha2`](./hashes/sha2.md) | SHA-224, SHA-256, SHA-384, SHA-512 and the SHA-512/t variants. |
| [`std.sha3`](./hashes/sha3.md) | SHA-3, SHAKE and the original Keccak. |
| [`std.blake2`](./hashes/blake2.md) | BLAKE2b and BLAKE2s, with keys, salts and personalisation. |
| [`std.blake3`](./hashes/blake3.md) | BLAKE3: hash, keyed hash, key derivation and any-length output. |
| [`std.ripemd`](./hashes/ripemd.md) | RIPEMD-160, and RIPEMD-128, 256 and 320. |
| [`std.sm3`](./hashes/sm3.md) | SM3, the Chinese national standard hash. |
| [`std.fasthash`](./hashes/fasthash.md) | FNV, xxHash and SipHash for hash tables. Not for security. |
| [`std.legacy`](./hashes/legacy.md) | MD5, SHA-1 and MD4, for old formats only. They are broken. |
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

Clocks, timers, the calendar, time zones and text forms. [Group overview](./time/index.md).

| Module | Purpose |
| --- | --- |
| [`std.time`](./time/time.md) | Clocks, durations and sleeping. |
| [`std.calendar`](./time/calendar.md) | Dates, times of day and date-times with no zone. |
| [`std.zone`](./time/zone.md) | IANA time zones, fixed offsets and POSIX rules. |
| [`std.timefmt`](./time/timefmt.md) | RFC 3339, RFC 2822, HTTP dates, durations and your own patterns. |
| [`std.tzdata`](./time/tzdata.md) | The IANA zone database, bundled for systems that have none. |

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
