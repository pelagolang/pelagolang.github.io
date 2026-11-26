---
title: Exhaustiveness
description: "A switch over an enum, option or result must cover every case or have a default."
---

A `switch` over an enum, an option or a result must cover every case or have a `default`. The compiler names the missing case:

```pelago error
enum dir { up, down, left }

fn f(d: dir) -> int {
    switch d {
        case dir.up: 1
        case dir.down: 2
    }
}

fn main() { print(f(dir.up)) }
```

```text

main:4:12: error: this `switch` does not handle `.left`; add a case for it or a `default`
```

## Related

- [switch](../../guide/switch/index.md)
