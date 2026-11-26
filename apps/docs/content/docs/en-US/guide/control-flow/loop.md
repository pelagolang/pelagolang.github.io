---
title: loop
description: "loop repeats forever until break, and is the only loop that can produce a value."
---

`loop { ... }` repeats its block until a `break`. Unlike `while` and `for`, a `loop` is an expression: `break value` ends it and gives that value.

```pelago
fn main() {
    var n = 0
    const r = loop {
        n += 1
        if n == 3 {
            break n * 10
        }
    }
    print(r)
    var i = 0
    loop {
        i += 1
        if i > 2 {
            break
        }
    }
    print(i)
}
```

```text
30
3
```

`break` with a value is only allowed in a `loop`:

```pelago error
fn main() {
    const r = while true { break 5 }
}
```

```text
only `loop` and labeled blocks can end with a value
```

## Related

[break, continue and labels](./break-continue.md), [while](./while.md)
