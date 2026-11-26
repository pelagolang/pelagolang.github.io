---
title: clone
description: "The clone interface: what copy does, which types copy automatically, and how an obj opts in."
---

```
pub interface clone {
    fn clone(self) -> Self
}
```

`copy x` makes an independent second value. Plain data (primitives, strings, collections, plain structs and enums) can always be copied. An `obj` must say how, with `impl clone`:

```pelago
obj c { n: int }

impl clone for c {
    fn clone(self) -> c = c { n: self.n }
}

fn main() {
    const a = c { n: 1 }
    var b = copy a
    b.n = 4
    print(a.n, b.n)
}
```

```text
1 4
```

`@derive(clone)` writes it for you, including nested list, option and base-class fields.

## Related

[Interfaces](./index.md), [Values and ownership](../../../guide/ownership.md)
