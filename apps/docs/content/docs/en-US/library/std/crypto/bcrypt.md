---
title: std.bcrypt
description: bcrypt password hashes in the $2b$ format.
---

```text
import std.bcrypt
```

bcrypt (Provos and Mazieres, 1999) is a password hash built on Blowfish with an expensive key schedule, in the `$2b$` text format that other implementations read. For new passwords prefer Argon2id in [std.password](./password.md); bcrypt is here for the many systems that already store `$2a$`, `$2b$` and `$2y$` hashes.

| Call | What it does |
| --- | --- |
| `bcrypt.make(password, cost, salt)` | The `$2b$` string (60 characters, the salt and cost inside) for a 16-byte salt. |
| `bcrypt.makeRandom(password, cost)` | The same with a new random salt from the system; fails with an `io_error`. |
| `bcrypt.check(password, encoded)` | True when the password produces the stored string. Accepts `$2a$`, `$2b$` and `$2y$`, compares in constant time, and gives `false` for a malformed string. |
| `bcrypt.raw(password, cost, salt)` | The raw hash bytes. |

`cost` is the base-2 logarithm of the rounds (4 to 31). 12 is a common floor today; raise it as machines get faster. bcrypt reads only the first 72 bytes of a password, so longer ones share a hash with their 72-byte prefix: hash them first (for example with [std.sha2](../hashes/sha2.md) and Base64) if that matters.

```pelago
import std.bcrypt
import std.hash

fn main() {
    const salt = hash.fromHex("000102030405060708090a0b0c0d0e0f") ?? []
    const stored = bcrypt.make("hunter2".bytes().toList(), 4, salt)
    print(stored)
    print(bcrypt.check("hunter2", stored), bcrypt.check("hunter3", stored))
}
```

```text
$2b$04$..CA.uOD/eaGAOmJB.yMBurkTM.teJW4P/NXJXOT49X8IHvXALk4i
true false
```

The sample uses cost 4 and a fixed salt so the output is repeatable; use a higher cost and `makeRandom` for real passwords. Checked against the C library's `crypt`.

Blowfish reads its tables at data-dependent places, so unlike the rest of the crypto modules, bcrypt is not constant time against cache attacks on the machine running it. That is a property of bcrypt itself.
