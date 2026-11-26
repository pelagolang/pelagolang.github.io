---
title: inout and the ! mark
description: "Change the caller's variable in place: the parameter mode, the call-site rule, the x! spelling, methods ending in !, and where inout is not allowed."
---

`inout` lets a function change the caller's variable. Declare the parameter with `inout`, and repeat `inout` at the call. The value is not copied: the function works on the caller's variable directly, and the caller sees the change when the call returns.

```pelago
fn bump(inout n: int) { n += 1 }

fn push_twice(inout xs: [int], v: int) {
    xs.push!(v)
    xs.push!(v)
}

fn main() {
    var a = 1
    bump(inout a)
    var list = [0]
    push_twice(inout list, 7)
    print(a, list)
}
```

```text
2 [0, 7, 7]
```

## The mark spelling

`inout n` and `n!` mean exactly the same, in parameters, at calls and in function types. One bang changes, two bangs consume.

```pelago
fn bump(n!: int) { n += 1 }

fn main() {
    var a = 1
    bump(a!)
    bump(a!)
    print(a)
}
```

```text
3
```

## The call must say so

Leaving the mark out is an error that names the argument:

```pelago error
fn bump(inout n: int) { n += 1 }

fn main() {
    var a = 1
    bump(a)
    print(a)
}
```

```text
main:5:10: error: the argument `n` is changed in place; write `inout ...` at the call
```

## The variable must be changeable

The argument has to be a `var`, or a field or element of one. A `const` cannot be changed:

```pelago error
fn bump(n!: int) { n += 1 }

fn main() {
    const a = 1
    bump(a!)
    print(a)
}
```

```text
main:5:10: error: `a` is a `const`, so it cannot be changed; declare it with `var`
```

## No two uses at once

While a call changes a value, nothing else in the same call may use that value, because the function could then see it changing under it:

```pelago error
fn two(a!: [int], b!: [int]) {}

fn main() {
    var a = [1]
    two(a!, a!)
}
```

```text
main:5:13: error: `a` is changed or given away by this call and also used by another argument of it; copy one of them first
```

## Methods

Methods that change their receiver end in `!`: `push!`, `pop!`, `insert!`, `sort!`. The receiver must be a `var`. A method written with `inout self` is called as `value.name!(...)`.

## Where else the mark appears

`for x! of xs` changes each element in place, `switch xs! { ... }` and patterns can bind with the mark, and closure captures use it, as in `[total!] x ~> total += x`. See [for](../control-flow/for.md) and [Functions](../functions.md).

## Edge cases

- Writing both `inout` and the mark on one name (`inout x!`) is an error.
- A field of a variable can be passed: `inc(p.n!)` changes just that field.
- A function type writes the mark after the type: `fn(int!)` is `fn(inout int)`.

## Related

- [Read access](./read-access.md), [sink](./sink.md), [Functions](../functions.md)
