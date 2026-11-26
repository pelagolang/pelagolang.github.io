---
title: Interfaces
description: "interface and impl: declaring shared behaviour, default methods, static dispatch with bounds, dynamic dispatch with any, and interfaces that build on others."
---

An `interface` lists methods. A type satisfies it with `impl interface for type`. There are two ways to use one: as a bound on a generic type (resolved at compile time, no cost), or as `any name` (resolved at run time, so different types can share one list).

```pelago
interface area_of {
    fn area(self) -> float
}

struct square { side: float }
struct circle { r: float }

impl area_of for square {
    fn area(self) -> float = self.side * self.side
}

impl area_of for circle {
    fn area(self) -> float = 3.0 * self.r * self.r
}

fn total(shapes: [any area_of]) -> float {
    var t = 0.0
    for s of shapes { t += s.area() }
    t
}

fn main() {
    const shapes: [any area_of] = [square { side: 2.0 }, circle { r: 1.0 }]
    print("#(total(shapes))")
}
```

```text
7
```

## Default methods

A method in the interface may have a body. A type that does not provide it gets the default.

```pelago
interface speak {
    fn name(self) -> string
    fn hello(self) -> string = "hi #(self.name())"
}

struct dog { n: string }

impl speak for dog {
    fn name(self) -> string = copy self.n
}

fn main() {
    const d = dog { n: "rex" }
    print(d.hello())
}
```

```text
hi rex
```

## Static dispatch: bounds

`<T: speak>` accepts any type with an `impl`, and the compiler builds a specialised version for each. See [Generics](./generics.md).

```pelago
interface speak {
    fn name(self) -> string
}

struct dog { n: string }

impl speak for dog {
    fn name(self) -> string = copy self.n
}

fn greet<T: speak>(x: T) -> string = "hello " + x.name()

fn main() {
    print(greet(dog { n: "rex" }))
}
```

```text
hello rex
```

## Dynamic dispatch: any

`any speak` is a value of some type that implements `speak`, with the exact type known only at run time. Use it to hold different types in one list or field, as in the first example.

## Building on another interface

`interface a : b` requires `b` as well. For example, `hash` is declared `interface hash : eq`, so a type needs `eq` before it can be hashed. See [hash](../../library/core/interfaces/hash.md).

## Interfaces in core

The language itself uses interfaces such as `show`, `eq`, `order`, `hash` and `clone`; implementing them gives printing, `==`, `<`, map keys and `copy`. See [Interfaces](../../library/core/interfaces/index.md).

## Related

- [Generics](./generics.md), [Structs](./struct.md), [Objects](./obj.md)
