---
title: Hashes and checksums
description: "Streaming hashes behind one interface: secure, fast and legacy."
---

Streaming hashes behind one interface: secure, fast and legacy.

| Module | Purpose |
| --- | --- |
| [`std.hash`](./hash.md) | The streaming hash interface, hex helpers and a constant-time compare. |
| [`std.sha2`](./sha2.md) | SHA-224, SHA-256, SHA-384, SHA-512 and the SHA-512/t variants. |
| [`std.sha3`](./sha3.md) | SHA-3, SHAKE and the original Keccak. |
| [`std.blake2`](./blake2.md) | BLAKE2b and BLAKE2s, with keys, salts and personalisation. |
| [`std.blake3`](./blake3.md) | BLAKE3: hash, keyed hash, key derivation and any-length output. |
| [`std.ripemd`](./ripemd.md) | RIPEMD-160, and RIPEMD-128, 256 and 320. |
| [`std.sm3`](./sm3.md) | SM3, the Chinese national standard hash. |
| [`std.fasthash`](./fasthash.md) | FNV, xxHash and SipHash for hash tables. Not for security. |
| [`std.legacy`](./legacy.md) | MD5, SHA-1 and MD4, for old formats only. They are broken. |
| [`std.checksum`](./checksum.md) | CRC-8 to CRC-64 and Adler-32. |
