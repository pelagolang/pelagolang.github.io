---
title: Objects and inheritance
description: "obj: families of types that share fields and behaviour, open and override, calling through a base type, and what is and is not enforced today."
---

Use `obj` when types form a family. A base marked `open` can be extended with `:`, and a method marked `open fn` can be replaced with `override fn` in a derived type. Calling a method on a value of the base type runs the version of the actual type.

```pelago
open obj animal {
    name: string

    open fn speak(self) -> string = "..."
    fn intro(self) -> string = "#(self.name): #(self.speak())"
}

obj dog : animal {
    override fn speak(self) -> string = "Woof"
}

obj fish : animal { }

fn main() {
    const a = dog { name: "Rex" }
    const b = fish { name: "Nemo" }
    print(a.intro())
    print(b.intro())
}
```

```text
Rex: Woof
Nemo: ...
```

## Declaring a family

- `open obj base Ellipsis` can be extended; a plain `obj` is not meant to be.
- `obj derived : base Ellipsis` inherits the base's fields and methods and may add its own. Construct it with all fields, inherited ones included.
- `open fn` marks a method that derived types may replace, and `override fn` replaces it.

## Using a derived value as its base

A value of a derived type can be used where the base is expected, and a list of the base type can hold both. A call runs the overriding method:

```pelago
open obj a {
    x: int
    open fn f(self) -> int = 1
}

obj b : a {
    override fn f(self) -> int = 5
}

fn main() {
    const v: a = b { x: 1 }
    print(v.f())
    const w = [a { x: 1 }, b { x: 2 }]
    for e of w { print(e.f()) }
}
```

```text
5
1
5
```

## obj compared with struct

| | `struct` | `obj` |
| --- | --- | --- |
| Inheritance | No | Yes, one base with `:` |
| Methods replaced by derived types | No | `open fn` and `override fn` |
| `==`, `print` | Plain structs compare automatically | Need `@derive` or an `impl`; see [eq](../../library/core/interfaces/eq.md) |
| Copying | Plain data copies; `copy` otherwise | `copy` needs `@derive(clone)` or `impl clone`; see [clone](../../library/core/interfaces/clone.md) |

Reach for `struct` and `interface` first; they are simpler and cover most designs.

## Deriving on an obj

```pelago
@derive(eq, hash, clone)
obj point {
    x: int
    y: int
}

fn main() {
    var seen: set<point> = set {}
    seen.insert!(point { x: 1, y: 2 })
    print(seen.contains(point { x: 1, y: 2 }), seen.len())
}
```

```text
true 1
```

## Not finished

- `abstract` and `final` are accepted by the parser, but the checker does not enforce them yet: extending a `final obj`, or an `obj` that is not `open`, and overriding a method that is not `open`, all compile today. Do not rely on them for safety.
- `super.method()` in an override is not an expression yet.

## Related

- [Structs](./struct.md), [Interfaces](./interface.md), [clone](../../library/core/interfaces/clone.md), [Keywords](../../reference/keywords.md)
