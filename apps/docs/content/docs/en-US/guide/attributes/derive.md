---
title: "@derive"
description: "@derive: generating show, eq, order, hash and clone (and JSON reading and writing) for a struct, enum or obj, what each one does, and when it is refused."
---

`@derive(name, ...)` before a `struct`, `enum` or `obj` writes the interface implementations for you, field by field and case by case.

```pelago
@derive(show, eq, order, hash, clone)
struct point {
    x: int
    y: int
}

fn main() {
    const a = point { x: 1, y: 2 }
    const b = a.clone()
    print(a, a == b, a < point { x: 1, y: 3 }, a.hash() == b.hash())
}
```

```text
point { x: 1, y: 2 } true true true
```

## What each name generates

| Name | Gives you | Page |
| --- | --- | --- |
| `show` | `print(x)` and `"#x"`; shows field names for structs and case names for enums. | [show](../../library/core/interfaces/show.md) |
| `eq` | `==`, `!=` and `.eq()`; compares field by field. | [eq](../../library/core/interfaces/eq.md) |
| `order` | `<`, `>`, `<=`, `>=`, `sort!`, `min`, `max`; compares fields first to last. | [order](../../library/core/interfaces/order.md) |
| `hash` | Use as a map key or set member; needs `eq` too. | [hash](../../library/core/interfaces/hash.md) |
| `clone` | `copy x` and `.clone()` for an `obj`. | [clone](../../library/core/interfaces/clone.md) |
| `fromJson`, `toJson` | Typed JSON reading and writing; needs `import std.json`. | [typed JSON](../../library/std/data/json-typed.md) |

A plain `struct` or `enum` made of comparable, copyable fields already supports `==` and `copy`; derive what you need beyond that. An `obj` has none of them until you derive or write the `impl`.

## Deriving on enums

```pelago
@derive(show, eq)
enum res {
    good(int)
    bad(msg: string)
    empty
}

fn main() {
    print(res.good(3), res.bad(msg: "no"), res.empty == res.empty)
}
```

```text
good(3) bad("no") true
```

## Deriving on obj

```pelago
@derive(eq, hash)
obj point {
    x: int
    y: int
}

fn main() {
    var seen: set<point> = set {}
    seen.insert!(point { x: 1, y: 2 })
    print(seen.contains(point { x: 1, y: 2 }), seen.contains(point { x: 2, y: 1 }), seen.len())
}
```

```text
true false 1
```

## When it cannot be derived

Every field must itself support the interface. A field that cannot be stored, such as a function value, is refused by the type checker:

```text
main:2:25: error: a field cannot hold a view such as `str` or a function value; use `string`, or `box<fn ...>` for a function
```

Without the derive, using the operation is an error that tells you the fix, for example ``a` cannot be ordered with `<`: it does not provide `order`; write `@derive(order)` on `a` or `impl order for a` ``.

## Related

- [Interfaces in core](../../library/core/interfaces/index.md), [Structs](../types/struct.md), [Objects](../types/obj.md)
