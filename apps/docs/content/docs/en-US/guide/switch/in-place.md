---
title: Matching in place
description: "switch x! and patterns with !: change the matched value through its pattern instead of copying it."
---

Mark the subject of a `switch` with `!` and the names in a pattern with `!` to change the value in place.

```pelago
fn main() {
    var p = (1, 2)
    switch p! {
        case (a!, b): a += b
    }
    print(p)
}
```

```text
(3, 2)
```

Here `a!` is the first component of `p` itself, so `a += b` changes `p`. The same marks work in `for x! of xs`; see [Ownership](../ownership/inout.md).

## Related

- [inout](../ownership/inout.md), [for](../control-flow/for.md)
