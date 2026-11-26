---
title: meta
description: "meta fn and meta calls: running ordinary code at compile time to build constants and tables, what is allowed, metaNote, and the limits."
---

`meta` runs ordinary Pelago code **while the program is being compiled** and puts the result into the program as a constant. A function that does this is declared `meta fn`, and it is called with `meta` in front of the call.

```pelago
meta fn fact(n: int) -> int = n <= 1 ? 1 : n * fact(n - 1)

const f10 = meta fact(10)

fn main() {
    print(f10)
}
```

```text
3628800
```

`fact(10)` is computed by the compiler. The built program contains the number `3628800`, not a loop.

## Building tables

A `meta fn` can use loops, locals and other functions, so a table can be built from a rule:

```pelago
fn square(x: int) -> int = x * x

meta fn table() -> [int] {
    var t: [int] = []
    for i of 0..5 { t.push!(square(i)) }
    t
}

const squares = meta table()

fn main() {
    print(squares)
}
```

```text
[0, 1, 4, 9, 16]
```

A fixed-size array works too:

```pelago
meta fn table() -> [int; 5] {
    var t = [0; 5]
    for i of 0..5 { t[i] = i * i }
    t
}

const squares = meta table()

fn main() {
    print(squares[3], squares.len())
}
```

```text
9 5
```

## Rules

- A `meta fn` can only be called inside `meta`. Calling it at run time is an error:

```pelago error
meta fn pick() -> int = 1

fn main() {
    print(pick())
}
```

```text
main:4:11: error: `pick` is a `meta fn`; it can only be called inside `meta`
```

- `print` is not available at compile time. Use `metaNote("...")`, which is reported by the compiler as a note:

```pelago error
meta fn bad() -> int {
    print("hi")
    1
}

const x = meta bad()

fn main() {
    print(x)
}
```

```text
main:2:5: error: `print` is not available at compile time; use `metaNote("...")`
```

```pelago
meta fn build() -> int {
    metaNote("building")
    4
}

const c = meta build()

fn main() {
    print(c)
}
```

```text
4
```

The note line (`note: meta: building`) is printed by the compiler before the program runs.

- Compile-time code is limited to ten million steps. A loop that does not end stops the build with `compile-time code ran too long (more than 10000000 steps)`.

## Not finished

- The arguments of a `meta` call must be literals or other compile-time values. A local `const` is not accepted yet; the compiler reports `compile-time code stopped: not lowered yet`.

## Related

- [Compile-time code](./index.md), [Functions](../functions.md), [Tail calls](../control-flow/tail-calls.md)
