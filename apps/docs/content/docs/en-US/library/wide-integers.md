---
title: Wide integers
description: int128, uint128, int256 and uint256, with the same checked arithmetic as int.
---

Four more whole-number types for values that do not fit in 64 bits: `int128`, `uint128`, `int256` and `uint256`. They follow exactly the rules of the narrower integer types, so there is nothing new to learn.

- Every operator works: `+ - * / %`, `& | ^ ~`, `<< >>`, the wrapping forms `+% -% *%`, the comparisons, `++`, `--` and the `op=` forms.
- **Overflow stops the program**, and so does a division by zero and a shift by the width or more. Nothing wraps unless you write a `%` operator.
- Two different integer types are never mixed silently. Convert with `to`, which is allowed when nothing can be lost: the same signedness and not narrower, or unsigned to a wider signed type (`uint128` to `int256`, `int` to `int128`). `to float` is allowed and rounds to within one step in the last place. Converting down, and `float` to a wide integer, are not written yet.
- A literal can be any number that fits the type. A literal larger than `uint128` is accepted only by a 256-bit type.
- They print, compare, hash, can be map keys and can be struct fields.

```pelago
fn main() {
    const a: int128 = 170141183460469231731687303715884105727
    const b: uint128 = 340282366920938463463374607431768211455
    print(a, b)
    const big: uint256 = 115792089237316195423570985008687907853269984665640564039457584007913129639935
    print(big)
    var f: uint128 = 1
    var i: uint128 = 1
    while i <= 30 {
        f = f * i
        i += 1
    }
    print(f)
    const n: int256 = -5
    print(n * n, n / 2, n % 2, n << 3)
    const w: uint128 = 3
    const wide: int256 = w to int256
    print(wide, b +% 1)
    print(a > a - 1, a == a, a != a - 1)
    const small: int = 7
    print((small to int128) * 1000000000000000000000)
}
```

```text
170141183460469231731687303715884105727 340282366920938463463374607431768211455
115792089237316195423570985008687907853269984665640564039457584007913129639935
265252859812191058636308480000000
25 -2 -1 -40
3 0
true true true
7000000000000000000000
```

Overflow is a stop, like it is for `int`:

```pelago exit
fn main() {
    const top: int128 = 170141183460469231731687303715884105727
    print(top + 1)
}
```

```text
stopped: arithmetic overflow
```

They work as struct fields and map keys too:

```pelago
struct account {
    id: uint128
    balance: int256
}

fn main() {
    const n: int256 = -5
    print(n to float)
    const top: uint128 = 340282366920938463463374607431768211455
    var m: map<uint128, string> = map { top: "max" }
    print(m[top])
    const acc = account { id: 7, balance: -90 }
    print(acc.id, acc.balance)
}
```

```text
-5
max
7 -90
```

## How they are built

A wide integer is a value of 2 or 4 64-bit words, least significant first, in two's complement. Addition, subtraction, the bit operations and comparisons are chains of 64-bit operations; multiplication, division, shifts and printing are library routines that loop over the words. One code path serves every width, and the interpreter, x86-64 and AArch64 all run it. The checks are the same as for `int`, and a stop is reported on the line of the arithmetic.

## Ranges and patterns

`for` over a range and `switch` with literal and range patterns work on the wide integers as they do on `int`.

```pelago
fn size(n: uint128) -> string {
    switch n {
        case 0: return "zero"
        case 1..=9: return "small"
        default: return "big"
    }
}

fn main() {
    print(size(0))
    print(size(7))
    print(size(1000000000000000000000))
    var sum: uint128 = 0
    for i of 1..=5 {
        sum += i
    }
    print(sum)
}
```

```text
zero
small
big
15
```

## JSON

With `@derive(toJson)` and `@derive(fromJson)` (see [std.json](./json.md)), a wide integer is written as a JSON **string** of digits, because most JSON tools read numbers as 64-bit floats and would round a big one. Reading accepts the string, and also a plain JSON number when it fits `int`. A value outside the type's range is an error, never a wrap.

```pelago
import std.json

@derive(fromJson, toJson)
struct ledger { id: uint128, balance: int256, rate: float128 }

fn main() {
    const l = ledger { id: 340282366920938463463374607431768211455, balance: -5, rate: 0.5 }
    const text = ledgerEncode(l)
    print(text)
    switch ledgerDecode(text) {
        case ok(b): print("#(b.id) #(b.balance) #(b.rate)")
        case err(e): print("error #e")
    }
    switch ledgerDecode("{\"id\": 7, \"balance\": \"-12\", \"rate\": 2.5}") {
        case ok(b): print("#(b.id) #(b.balance) #(b.rate)")
        case err(e): print("error #e")
    }
    switch ledgerDecode("{\"id\": \"340282366920938463463374607431768211456\", \"balance\": \"1\", \"rate\": \"inf\"}") {
        case ok(_): print("unexpected")
        case err(e): print("error #e")
    }
}
```

```text
{"id":"340282366920938463463374607431768211455","balance":"-5","rate":"0.5"}
340282366920938463463374607431768211455 -5 0.5
7 -12 2.5
error 1:8: $.id: "340282366920938463463374607431768211456" is not a whole number that fits in uint128 (0 to 340282366920938463463374607431768211455)
```

## What is not there yet

- **Speed.** Correctness came first. Division is a shift-and-subtract loop, multiplication and shifts are calls, and printing is slow for large values. These are on the optimisation list and will get faster without changing results.
- **Floats.** `float` printing stops at the 64-bit range. The wider and narrower floats are on [their own page](./wide-floats.md).
