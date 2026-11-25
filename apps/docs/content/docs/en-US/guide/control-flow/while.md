---
title: while
description: "while repeats a block while a bool condition holds; testing a pattern in the condition."
---

`while cond { ... }` checks the condition before every pass, so the block may run zero times. The condition must be a `bool`.

```pelago
fn main() {
    var i = 0
    while i < 3 {
        i += 1
    }
    print(i)
    while i > 0 {
        i -= 1
        if i == 1 {
            break
        }
    }
    print(i)
}
```

```text
3
1
```

## A pattern in the condition

`is` works in a `while` condition, so a loop can run as long as something is present. `pop!` returns `none` when the list is empty:

```pelago
fn main() {
    var xs = [1, 2, 3]
    while xs.pop!() is some(v) {
        print(v)
    }
}
```

```text
3
2
1
```

## Notes

- `break` and `continue` work as in every loop; see [break, continue and labels](./break-continue.md).
- `while` is a statement. To produce a value from a loop, use [`loop`](./loop.md).
- `do { ... } while cond` is parsed but **not lowered yet**; a program using it stops with `not lowered yet`.

## Related

[for](./for.md), [loop](./loop.md)
