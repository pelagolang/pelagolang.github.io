---
title: Read access
description: "The default parameter mode: the function can look at the value but not change or keep it; no reference outlives the call."
---

A parameter written without a mode is **read-only**. The function can read it, call read-only methods on it and pass it on as a read argument. It cannot change it, and it cannot keep it.

```pelago
fn first(xs: [int]) -> int = xs[0]
fn total(xs: [int]) -> int {
    var sum = 0
    for x of xs { sum += x }
    sum
}

fn main() {
    const xs = [4, 5, 6]
    print(first(xs), total(xs))
    print(xs)
}
```

```text
4 15
[4, 5, 6]
```

The call does not repeat anything: a read call looks like any other. The argument stays valid after the call.

## What a read parameter cannot do

```pelago error
fn change(xs: [int]) { xs.push!(1) }

fn main() {
    var a = [1]
    change(a)
}
```

```text
main:1:24: error: `xs` is a read-only parameter; write `inout xs` to change it
```

Changing needs `inout`. Giving the value away needs `sink`.

## How it is passed

A small plain value such as an `int` is passed in a register. A larger value is passed by address and **not copied**, so reading a million-item list in a function costs nothing. The function never sees a copy it could keep, and the caller's value cannot change during the call because the caller is not running.

## Reading through other values

A read parameter that holds a struct lets you read its fields, index into its lists and call read methods on them (`xs.len()`, `s.contains("a")`), at any depth.

## No references that outlive a call

The only place a reference exists is inside a call. You cannot declare a variable of a "reference type", return one or store one in a struct. That is why no lifetime annotation is needed, and why a value cannot be freed while something still points at it.

## Edge cases

- A read parameter can be passed to another function that wants `inout` or `sink` only by making a `copy`.
- Closures read captured variables by default. See [Functions](../functions.md).

## Related

- [inout](./inout.md), [sink](./sink.md), [Functions](../functions.md)
