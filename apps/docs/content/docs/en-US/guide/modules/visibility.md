---
title: Visibility with pub and priv
description: "pub and priv: what other modules can see, public and private fields, and the errors for using a private name."
---

Names are private to their module unless marked `pub`. `pub` goes in front of a function, constant, type, field or method. `priv` states the default explicitly.

`geometry.pel`:

```text
pub struct point {
    pub x: int
    y: int

    pub init(x: int) -> Self {
        self.x = x
        self.y = 0
    }
}

pub fn origin() -> point = point(1)
pub const scale: int = 3

fn helper() -> int = 1
```

`main.pel`:

```text
import geometry

fn main() {
    const p = geometry.origin()
    print(p.x, geometry.scale)
}
```

`pelago run .` prints:

```text
1 3
```

`geometry` exposes the type `point`, its field `x`, its constructor, `origin` and `scale`. `y` and `helper` stay inside.

## Private functions

`geometry.pel`:

```text
pub fn origin() -> int = 0

fn helper() -> int = 1
```

`main.pel`:

```text
import geometry

fn main() {
    print(geometry.helper())
}
```

`pelago run .` stops with:

```text
main:4:20: error: `helper` is private to `main.geometry`
```

## Private fields

A field is private unless it is `pub`, even when the struct itself is. Other modules can hold a `point` and read `x`, but cannot read `y`:

`geometry.pel`:

```text
pub struct point {
    pub x: int
    y: int

    pub init(x: int) -> Self {
        self.x = x
        self.y = 0
    }
}

pub fn origin() -> point = point(1)
```

`main.pel`:

```text
import geometry

fn main() {
    const p = geometry.origin()
    print(p.y)
}
```

`pelago run .` stops with:

```text
main:5:13: error: the field `y` of `point` is private
```

Keeping a field private lets the module change how a type is stored without breaking its users, and lets `init` guarantee what the fields contain.

## Within a module

Everything in the same module sees everything else, public or not, and the order of declarations does not matter.

## Related

- [Imports](./imports.md), [Structs](../types/struct.md) (`init`)
