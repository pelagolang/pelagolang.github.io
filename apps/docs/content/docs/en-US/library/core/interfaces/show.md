---
title: show
description: "The show interface: what can be printed, how to give your own type a text form, and @derive(show)."
---

```
pub interface show {
    fn show(self) -> string
}
```

A type that is `show` can be passed to `print` and put into a `#name` or `#( )` hole of a string. All primitives, strings, and collections of `show` elements are `show` already. **A `struct`, `enum` or `obj` you write is not**: printing one is the error ``this has type `color`, but `any show` is expected; `color` does not provide `show` ``.

## Giving your type a text form

Write the method yourself, or derive it.

```pelago
struct pt { x: int, y: int }

impl show for pt {
    fn show(self) -> string = "(#(self.x), #(self.y))"
}

fn main() {
    const p = pt { x: 1, y: 2 }
    print(p, "at #p", [p])
}
```

```text
(1, 2) at (1, 2) [(1, 2)]
```

`@derive(show)` writes one for you:

```pelago
@derive(show)
enum color { red, green }

@derive(show)
struct tag { c: color, n: int }

fn main() {
    print(color.red, [color.green], tag { c: color.green, n: 2 })
}
```

```text
red [green] tag { c: green, n: 2 }
```

## Edge cases

- Inside `show`, a field of type `string` cannot be moved out of `self`; write `copy self.name` when you return it as the whole result.
- `show` is for people; there is no round-trip guarantee. Use the [JSON](../../std/data/json-typed.md) support to encode data.
- Floats print as the shortest text that reads back as the same value (`0.1`, `1e+300`, `inf`, `nan`); see [`float`](../primitives/float.md#text-form).

## Related

[Interfaces](./index.md), [`str`](../text/str.md), [`string`](../text/string.md)
