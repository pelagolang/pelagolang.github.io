---
title: eq
description: "The eq interface: == and !=, which types have it already, and how to give an obj equality."
---

```
pub interface eq {
    fn eq(self, other: Self) -> bool
}
```

`a == b` and `a != b` need `eq`. Primitives, strings and collections have it; a plain `struct` or `enum` compares field by field and case by case, automatically. An `obj` does not: comparing two is the error ```o` cannot be compared with `==`: it does not provide `eq`; write `@derive(eq)` on `o` or `impl eq for o` ``.

```pelago
enum color { red, green }
struct tag { c: color, n: int }

obj thing { id: int }

impl eq for thing {
    fn eq(self, other: thing) -> bool = self.id == other.id
}

fn main() {
    print(color.red == color.red, color.red == color.green)
    print(tag { c: color.green, n: 2 } == tag { c: color.green, n: 2 })
    const a = thing { id: 1 }
    const b = thing { id: 1 }
    print(a == b, a != b)
}
```

```text
true false
true
false true
```

`!=` is the opposite of `eq`; you never write it. Lists, maps and sets compare by value; maps and sets ignore order.

## Not finished

`@derive(eq)` on an `obj` is accepted but not lowered yet (``not lowered yet: comparing this type``); write `impl eq`.

## Related

[Interfaces](./index.md), [`order`](./order.md), [`hash`](./hash.md)
