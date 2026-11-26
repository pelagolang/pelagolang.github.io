---
title: sink and the !! mark
description: "Take ownership of an argument: the parameter mode, the call-site rule, the x!! spelling, consuming methods like join!!, and what the compiler reports after."
---

`sink` hands a value to the function for good. The function becomes the owner, and the caller may not use the variable afterwards. Use it when the function stores the value, returns it, or finishes with it.

```pelago
fn count(sink xs: [int]) -> int = xs.len()

fn main() {
    const xs = [1, 2, 3]
    print(count(sink xs))
}
```

```text
3
```

## The call must say so

```pelago error
fn eat(sink xs: [int]) {}

fn main() {
    const a = [1]
    eat(a)
}
```

```text
main:5:9: error: the argument `xs` takes the value away; write `sink ...` at the call
```

## The value is gone afterwards

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

If you still need it, hand over a copy: `eat(sink copy a)`.

## The mark spelling

`sink x` and `x!!` mean the same. A consuming method is called with `!!`: `task.join!!()` uses the task up, and `box.take!!()` moves the content out.

```pelago
fn count(xs!!: [int]) -> int = xs.len()

fn main() {
    const xs = [1, 2, 3]
    print(count(xs!!))
}
```

```text
3
```

## Why sink exists

Without it, a function that wants to keep a value would have to copy it. With it, the caller says "you may have this", and the value moves with no copy. Storing a value in a struct field, pushing it into a list, and handing a resource to a thread are the typical uses.

```pelago
struct bag {
    items: [string]
}

fn add(inout b: bag, sink s: string) {
    b.items.push!(sink s)
}

fn main() {
    var b = bag { items: [] }
    const name = "ann"
    add(inout b, sink name)
    print(b.items)
}
```

```text
["ann"]
```

## Edge cases

- A plain value such as an `int` can be passed to `sink`; it is copied and the original stays usable.
- A `sink` parameter that the function does not use is still released when the function ends, running its `deinit`.
- A value cannot be passed twice in one call when one use gives it away.

## Related

- [Moves](./moves.md), [inout](./inout.md), [Cleanup](./cleanup.md), [Functions](../functions.md)
