---
title: is
description: "A pattern as a test: if, while and guard with is, binding names for the block, and is in conditions and list builders."
---

When you only care about one shape, `is` tests it and binds names for the block that follows.

```pelago
enum shape {
    circle(radius: float)
    square(side: float)
}

fn main() {
    const shapes = [shape.circle(1.0), shape.square(2.0), shape.circle(3.0)]
    const first = shapes[0]
    if first is .circle(r) { print("radius #r") }

    const radii = [s of shapes if s is .circle(r) ~> r]
    print("#radii")
}
```

```text
radius 1
[1, 3]
```

## In if

```pelago
fn main() {
    const o: int? = 3
    if o is some(v) && v > 2 { print("big #v") }
    const items: [int?] = [1, none, 3]
    var total = 0
    for it of items { if it is some(v) { total += v } }
    print(total)
}
```

```text
big 3
4
```

Names bound by `is` are in scope in the block and in the rest of an `&&` condition.

## In while

The loop runs for as long as the pattern matches:

```pelago
fn main() {
    var o: int? = 3
    while o is some(v) {
        print(v)
        o = v > 1 ? v - 1 : none
    }
}
```

```text
3
2
1
```

## In guard

`guard value is pattern else { ... }` binds the names for the rest of the function and leaves in the `else`. See [guard](../control-flow/guard.md).

```pelago
fn first(o: int?) -> int {
    guard o is some(w) else { return -1 }
    w
}

fn main() {
    print(first(none), first(4))
}
```

```text
-1 4
```

## As a value

`x is pattern` is a `bool` expression, so it can be stored or returned. It works on ranges too:

```pelago
fn main() {
    const x = 4
    print(x is 1..5, x is 7)
}
```

```text
true false
```

## Related

- [Options and results](./options-results.md), [guard](../control-flow/guard.md), [while](../control-flow/while.md)
