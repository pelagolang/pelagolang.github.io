---
title: uint128
description: "The 128-bit unsigned integer: range, literals, checked arithmetic, methods, conversions and JSON."
---

`uint128` is a 128-bit unsigned integer, stored as 2 64-bit words, least significant first. Its values run from `0` to `340282366920938463463374607431768211455`. It follows exactly the rules of [`int`](./int.md) with a wider range, so there is nothing new to learn.

## Writing a value

A decimal, hexadecimal, binary or octal literal that fits the type, such as `const a: uint128 = 340282366920938463463374607431768211455`. A literal outside the range is a compile-time error. There is no negative literal.

## Arithmetic

`+ - * / %`, `++`, `--`, the bitwise operators, `<<`, `>>`, the wrapping forms `+% -% *%`, the comparisons and every `op=` form work on two values of `uint128`.

- **Overflow stops the program** with `stopped: arithmetic overflow`; so does a division by zero (`stopped: division by zero`) and a shift by 128 or more (`stopped: shifted by the width or more`).
- The wrapping forms wrap modulo 2^128.
- Two different integer types are never mixed silently.

```pelago
fn main() {
    const lo: uint128 = 0
    const hi: uint128 = 340282366920938463463374607431768211455
    print("#lo")
    print("#hi")
    print("#(hi +% 1) #(hi / 3) #(hi % 1000) #(hi >> 100) #(hi & 255)")
    var f: uint128 = 1
    var i: uint128 = 1
    while i <= 25 {
        f = f * i
        i += 1
    }
    print("25! = #f")
}
```

```text
0
340282366920938463463374607431768211455
0 113427455640312821154458202477256070485 455 268435455 255
25! = 15511210043330985984000000
```

Overflow is a stop:

```pelago exit
fn main() {
    const top: uint128 = 340282366920938463463374607431768211455
    print(top + 1)
}
```

```text
stopped: arithmetic overflow
```

## Methods

`min(o)`, `max(o)` and `pow(e)`. Like every other operation, `pow` stops the program on overflow. Everything else is an operator.

## Converting

`to` converts when nothing can be lost. From `uint128`, `to` is accepted for: `int256`, `uint256`, `float`. `to float` rounds to within one step in the last place. Into `uint128`, a narrower type of the same signedness, or a narrower unsigned type into a signed one, is accepted. Converting down, and `float` to a wide integer, are not written yet.

## Equality, hashing and JSON

A `uint128` is `eq`, `order`, `hash` and `show`, so it works as a map key, a set member, a struct field and in `for` ranges and `switch` patterns. With `@derive(toJson)` it is written as a JSON **string** of digits, because most JSON tools read numbers as 64-bit floats; reading accepts the string, and a plain JSON number when it fits `int`. A value outside the range is an error, never a wrap. See [typed JSON](../../std/data/json-typed.md).

## Not finished

Speed: correctness came first, so division is a shift-and-subtract loop and printing a large value is slow. Narrowing `to`, and `float` to a wide integer, are not written yet.

## Related

[`int`](./int.md), [Wide integers overview](../wide-integers.md)
