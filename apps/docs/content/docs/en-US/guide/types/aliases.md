---
title: Type aliases
description: "type: a second name for an existing type, generic aliases, and why an alias is not a new type."
---

`type` gives an existing type another name. The alias and the original are the same type: values move freely between them.

```pelago
type meters = float

fn main() {
    const m: meters = 2.5
    print("#m")
}
```

```text
2.5
```

## Aliases for compound types

```pelago
type pair<T> = (T, T)
type id = int
type names = [string]

fn first(p: pair<int>) -> int = p.0

fn main() {
    const x: id = 5
    const n: names = ["a"]
    print(first((1, 2)), x + 1, n.len())
    const y: int = x
    print(y)
}
```

```text
1 6 1
5
```

## An alias is not a new type

`type meters = float` does not stop you passing a plain `float` where `meters` is expected, and arithmetic works as before. If you need the compiler to keep two things apart, make a `struct`: two structs with the same fields are different types.

```pelago error
struct meters { v: float }
struct feet { v: float }

fn f(m: meters) -> float = m.v

fn main() {
    print(f(feet { v: 1.0 }))
}
```

```text
main:7:13: error: this has type `feet`, but `meters` is expected
```

## Related

- [Structs](./struct.md), [Tuples](./tuples.md), [Generics](./generics.md)
