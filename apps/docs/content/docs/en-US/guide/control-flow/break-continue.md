---
title: break, continue and labels
description: "Leaving a loop, skipping to the next pass, and naming a loop to break or continue an outer one."
---

- `break` leaves the innermost loop.
- `continue` skips the rest of the pass and starts the next one.
- `break` in a `loop` can carry a value ([loop](./loop.md)).

```pelago
fn main() {
    for i of 0..10 {
        if i % 2 == 0 {
            continue
        }
        if i > 6 {
            break
        }
        print(i)
    }
}
```

```text
1
3
5
```

## Labels

Put `name:` before a loop to give it a label, then `break name` or `continue name` acts on that loop from inside an inner one.

```pelago
fn main() {
    outer: for i of 0..3 {
        for j of 0..3 {
            if j == 2 {
                continue outer
            }
            if i == 2 {
                break outer
            }
            print("#i#j")
        }
    }
}
```

```text
00
01
10
11
```

Without a label, leaving two loops takes a flag:

```pelago
fn main() {
    var found = -1
    for i of 0..5 {
        for j of 0..5 {
            if i * j == 6 {
                found = i * 10 + j
                break
            }
        }
        if found >= 0 {
            break
        }
    }
    print(found)
}
```

```text
23
```

## Not finished

A label on a plain block (`done: { ... }`) with `break done value` is not accepted yet; labels work on loops.

## Related

[for](./for.md), [while](./while.md), [loop](./loop.md)
