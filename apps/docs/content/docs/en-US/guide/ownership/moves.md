---
title: Moves
description: "When a value is moved, what the compiler reports for a use after a move, how to keep a value with copy, and how moves interact with loops, branches and containers."
---

A **move** gives a value to a new owner. The old name is dead afterwards: the compiler refuses to compile any use of it, so a moved value is never read by accident and is released exactly once.

## What moves

Assignment, `const`/`var` initialisation, a `sink` argument and a `return` move owning data. Plain data is copied instead, so only strings, lists, maps, sets, boxes and structs, tuples or enums that contain them can be moved.

```pelago error
fn main() {
    const a = [1, 2, 3]
    const b = a
    print("#(a.len())")
}
```

```text
main:4:14: error: `a` was moved on line 3 and cannot be used again; write `copy a` there to keep it
```

The message names the line of the move and the fix. Either write `copy a` on that line to keep both, or stop using `a`.

```pelago
fn main() {
    const a = [1, 2, 3]
    const b = copy a
    print(a.len(), b.len())
}
```

```text
3 3
```

## Giving a value to a function

Passing an owning value to a `sink` parameter moves it. See [sink](./sink.md) for the call-site rule.

```pelago error
fn eat(sink xs: [int]) {}

fn main() {
    const a = [1]
    eat(sink a)
    print(a.len())
}
```

```text
main:6:11: error: `a` was moved on line 5 and cannot be used again; write `copy a` there to keep it
```

## Returning a value

`return` moves the value out of the function to the caller, with no copy. Building and returning a list is cheap.

```pelago
fn build() -> [int] {
    var xs = [1, 2, 3]
    xs.push!(4)
    xs
}

fn main() {
    var r = build()
    r.push!(5)
    print(r)
}
```

```text
[1, 2, 3, 4, 5]
```

## Moves and loops

Using a value after a move is an error even when the move happens in a loop, and a value cannot be moved again on a later round. Iterating a list with `for x of xs` does not move it: the loop reads the elements.

```pelago
fn main() {
    var xs = [1, 2]
    for x of xs { print(x) }
    print(xs)
}
```

```text
1
2
[1, 2]
```

## Moves out of containers

You cannot move an element out of a list, map or struct field, because the container would be left with a hole. Use `copy`, or an operation that removes it properly such as `pop!`, `remove!` or `take!!`. See [Values and copies](./values-and-copies.md#copying-out-of-a-container).

## Edge cases

- A moved-from variable declared with `var` may be assigned a new value and then used again.
- Moving a value does not run `deinit`; the new owner will run it. See [Cleanup](./cleanup.md).
- Two arguments of one call may not name the same value when one is changed or given away: `two(a!, a!)` is an error (`a` is changed or given away by this call and also used by another argument of it).

## Related

- [Values and copies](./values-and-copies.md), [sink](./sink.md), [Cleanup](./cleanup.md)
