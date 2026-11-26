---
title: Functions
description: "fn declarations: parameters, defaults, variadic arguments, result types and never."
---

```text
fn name(parameters) -> result { body }
fn name(parameters) -> result = expression
```

The body's last expression is the function's value. The `= expression` form is a shorthand for a body that is one expression.

## Parameters

A parameter is `name: type`, optionally preceded by `inout` or `sink` (see [Ownership](../../guide/ownership/index.md)) and optionally followed by `= default`. A final `...name: type` collects the remaining arguments into a list.

```pelago
fn greet(who: string, greeting: string = "hello") -> string = "#greeting, #who"

fn sum(...xs: int) -> int {
    var t = 0
    for x in xs { t += x }
    t
}

fn main() {
    print(greet("sea"))
    print(greet("sea", "ahoy"))
    print(sum(1, 2, 3), sum())
}
```

```text
hello, sea
ahoy, sea
6 0
```

## Result types

A result type is a plain type, `T?` for a value that may be `none`, `T ! E` for a value that may be an error, or absent when the function returns nothing.

```pelago
fn first(xs: list<int>) -> int? = if xs.len() > 0 { xs[0] } else { none }

fn main() { print(first([4, 5]), first([])) }
```

```text
some(4) none
```

## never

A function that cannot return has the result type `never`. A branch that calls one still type checks, because `never` fits any type. Here `die` stops the program, so `pick` needs no value for that branch:

```pelago exit
fn die(why: string) -> never { panic(why) }

fn pick(n: int) -> int {
    if n > 0 { n } else { die("not positive") }
}

fn main() {
    print(pick(3))
    print(pick(0))
}
```

```text
3
not positive
```

The second call reaches `panic`, which prints its message and stops the program with an error status.

## Related

- [Functions guide](../../guide/functions.md)
- [Error handling](../../guide/errors.md)
