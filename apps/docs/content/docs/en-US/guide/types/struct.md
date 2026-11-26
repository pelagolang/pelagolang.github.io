---
title: Structs
description: "struct: fields, defaults, construction, methods with self, inout self and sink self, init, associated functions and constants, copying and derived traits."
---

A `struct` is a group of named fields with methods. It is a plain value: assigning it copies or moves it as the [ownership rules](../ownership/index.md) say, and two structs never share fields.

```pelago
struct user {
    name: string
    age: int = 18

    fn greeting(self) -> string = "Hi, #(self.name)"
}

fn main() {
    const u = user { name: "Ada" }
    print("#(u.name) is #(u.age). #(u.greeting())")
}
```

```text
Ada is 18. Hi, Ada
```

## Fields and construction

A field is `name: type`, optionally followed by `= default`. A struct is built with `type { field: value, ... }`. Every field without a default must be given, and a name that does not exist is an error:

```pelago error
struct p { x: int, y: int }

fn main() {
    const a = p { x: 1 }
}
```

```text
main:4:15: error: `p` needs `y`
```

```pelago error
struct p { x: int }

fn main() {
    const a = p { y: 1 }
}
```

```text
main:4:15: error: `p` needs `x`
```

Fields are read and written with a dot. Writing needs a `var`:

```pelago error
struct p { x: int }

fn main() {
    const a = p { x: 1 }
    a.x = 2
}
```

```text
main:5:5: error: `a` is a `const`, so it cannot be changed; declare it with `var`
```

There is no spread syntax for building a struct from another; copy the value and change the field: `var b = copy a`, then `b.x = 5`.

## Methods

Methods are declared inside the struct. The first parameter says how the method uses the value, with the same modes as [any function](../ownership/index.md):

| Declared | Called | The method can |
| --- | --- | --- |
| `fn m(self)` | `p.m()` | Read the value. |
| `fn m(inout self)` | `p.m!()` | Change the value in place. The receiver must be a `var`. |
| `fn m(sink self)` | `p.m!!()` | Consume the value. It cannot be used afterwards. |

```pelago
struct point {
    x: int
    y: int = 0

    fn dist2(self) -> int = self.x * self.x + self.y * self.y
    fn shift(inout self, dx: int) { self.x += dx }
    fn into(sink self) -> int = self.x
}

fn main() {
    var p = point { x: 3, y: 4 }
    p.shift!(1)
    print(p.dist2())
    const q = point { x: 1 }
    print(q.y, q.into!!())
}
```

```text
32
0 1
```

## Associated functions and constants

A function without `self` belongs to the type and is called through its name. A `const` inside a struct is shared by the type.

```pelago
struct temp {
    deg: float
    const freezing: float = 0.0

    fn make(d: float) -> temp = temp { deg: d }
}

fn main() {
    const t = temp.make(3.5)
    print(t.deg, temp.freezing)
}
```

```text
3.5 0
```

## Custom construction with init

An `init` can check its arguments. Its result type says it may fail, and calling the type like a function runs it.

```pelago
struct range {
    lo: int
    hi: int

    init(lo: int, hi: int) -> Self ! string {
        if lo > hi { return err("bad range") }
        self.lo = lo
        self.hi = hi
    }

    fn width(self) -> int = self.hi - self.lo
}

fn main() {
    switch range(1, 5) {
        case ok(r): print("width #(r.width())")
        case err(e): print(e)
    }
    switch range(5, 1) {
        case ok(r): print("width #(r.width())")
        case err(e): print(e)
    }
}
```

```text
width 4
bad range
```

## Copying

```pelago
struct user {
    name: string
    age: int = 18
}

fn main() {
    const a = user { name: "Ada" }
    var b = copy a
    b.age = 30
    print("#(a.age) #(b.age)")
}
```

```text
18 30
```

A struct made only of plain fields (numbers, `bool`, `char`) is copied by assignment, so `copy` is not needed for it. A struct holding a string or list moves.

## Printing and comparing

A struct does not print or compare itself until you ask. Add `@derive` for the interfaces you want, or write the `impl`. Derived printing shows the field names:

```pelago
@derive(show, eq)
struct point {
    x: int
    y: int
}

fn main() {
    const a = point { x: 1, y: 2 }
    print(a, a == point { x: 1, y: 2 }, a != point { x: 2, y: 2 })
}
```

```text
point { x: 1, y: 2 } true true
```

Without `show`, `print(a)` is the error shown on the [Types](./index.md) page. A plain struct made of comparable fields can also use `==` without a derive; see [eq](../../library/core/interfaces/eq.md).

## Edge cases

- A struct may be empty only if written with braces on one line: `struct unit {}`.
- A struct cannot contain itself directly; use a [`box`](../ownership/box.md).
- `deinit` runs when the value goes away; see [Cleanup](../ownership/cleanup.md).

## Related

- [Enums](./enum.md), [Objects](./obj.md), [Interfaces](./interface.md), [Generics](./generics.md), [Tuples](./tuples.md)
