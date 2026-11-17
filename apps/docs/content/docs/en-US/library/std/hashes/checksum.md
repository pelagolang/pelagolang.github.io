---
title: std.checksum
description: CRC-8 to CRC-64 and Adler-32, for catching accidents.
---

```text
import std.checksum
import std.hash
import { adler32, crc } = std.checksum
```

**These catch accidents, not attackers.** Anyone can make data with a chosen checksum, so never use them to check that data was not tampered with.

CRCs and Adler-32 are [`hasher`](./hash.md)s like the cryptographic ones, so `update!`, `finish`, `digest` and `hex` work. The digest is the checksum in big-endian bytes, and `value()` gives it as a number.

| Make one | Used by |
| --- | --- |
| `crc.crc32()` | zip, PNG, gzip |
| `crc.crc32c()` | Castagnoli: iSCSI, ext4 |
| `crc.crc64xz()` | xz |
| `crc.crc64ecma()` | ECMA-182 |
| `crc.crc16arc()`, `crc.crc16ccitt()`, `crc.crc16xmodem()` | the usual 16-bit ones |
| `crc.crc8()` | the plain 8-bit CRC |
| `adler32.new()` | zlib |
| `crc.custom(width, poly, start, reflect, finalXor)` | any CRC described by the usual parameters (the Rocksoft model) |

```pelago
import std.checksum
import std.hash
import { adler32, crc } = std.checksum

fn main() {
    var c = crc.crc32()
    c.update!("1234".bytes().toList())
    c.update!("56789".bytes().toList())
    print(hash.hex(c.finish()), c.value())
    print(hash.hex(hash.digestText(crc.crc32c(), "123456789")))
    var a = adler32.new()
    a.update!("Wikipedia".bytes().toList())
    print(a.value())
    print(hash.hex(hash.digestText(crc.custom(24, 0x864cfb, 0xb704ce, false, 0), "123456789")))
}
```

```text
cbf43926 3421780262
e3069283
300286872
21cf02
```

The code is table-driven, one lookup per byte. That is fine here because nothing is secret. Results are checked against the catalogue's check values, Python's `zlib` and a bit-by-bit reference.

## What is not there yet

Fletcher, and CRC widths that are not a whole number of bytes (CRC-5, CRC-12 and so on).
