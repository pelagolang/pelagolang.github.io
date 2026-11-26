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

## Calling it as a method

`x.clone()` is the method form of `copy x`: it returns a deep independent duplicate. It works on every type that can be copied (numbers, text, collections, structs, derived or hand-written `obj`s), and through a `T: clone` bound.

```pelago
@derive(clone)
obj bag {
    items: [int]
}

fn twin<T: clone>(v: T) -> T = v.clone()

fn main() {
    var a = bag { items: [1, 2] }
    var b = a.clone()
    b.items.push!(3)
    print(a.items, b.items, twin([7, 8]))
}
```

```text
[1, 2] [1, 2, 3] [7, 8]
```

## Related

[Interfaces](./index.md), [Values and ownership](../../../guide/ownership/index.md)
