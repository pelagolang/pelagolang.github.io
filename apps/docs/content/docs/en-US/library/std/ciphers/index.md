---
title: Ciphers and AEAD
description: "Encryption, and authenticated encryption for messages."
---

Encryption, and authenticated encryption for messages. Prefer `std.aead`: a bare cipher does not detect tampering.

| Module | Purpose |
| --- | --- |
| [`std.chacha`](./chacha.md) | ChaCha20 and XChaCha20 stream ciphers. |
| [`std.aead`](./aead.md) | ChaCha20-Poly1305 and XChaCha20-Poly1305 authenticated encryption. |
