---
title: Ranges and membership
description: ".. and ..= build ranges, and in tests membership."
---

`a..b` excludes `b`; `a..=b` includes it. Ranges are used in `for` loops, in slices and in `switch` patterns, and `x in range` tests membership.

```pelago
fn main() {
    for i in 0..3 { print(i) }
    for i in 0..=3 { print(i) }
    print(5 in 1..10, 10 in 1..10, 10 in 1..=10)
}
```

```text
0
1
2
0
1
2
3
true false true
```

## Related

- [Control flow](../../guide/control-flow/index.md)
