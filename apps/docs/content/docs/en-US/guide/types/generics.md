---
title: Generics
description: "Type parameters on functions, structs and enums, bounds with : and +, where clauses, inference, and what is compiled."
---

Type parameters go in angle brackets. A bound says what the type has to support. Generic code is compiled once per type it is used with, so there is no run-time cost.

```pelago
struct stack<T> {
    items: [T]

    fn push(inout self, sink item: T) { self.items.push!(item) }
    fn size(self) -> int = self.items.len()
}

fn largest<T: order>(a: T, b: T) -> T {
    a > b ? a : b
}

fn main() {
    var s: stack<int> = stack { items: [] }
    s.push!(1)
    s.push!(2)
    print("#(s.size()) #(largest(3, 9)) #(largest(2.5, 1.5))")
}
```

```text
2 9 2.5
```

## Generic functions

`fn name<T>(...)` declares a type parameter. The compiler infers it from the arguments, so `largest(3, 9)` needs no `<int>`. Both arguments must be the same type:

```pelago error
fn big<T: order>(a: T, b: T) -> T = a > b ? a : b

fn main() {
    print(big(1, 2.5))
}
```

```text
main:4:18: error: this has type `{float}`, but `{integer}` is expected
```

## Generic types

Structs and enums take parameters too. When the compiler cannot infer the type, give it on the variable or at the construction.

```pelago
@derive(show)
struct wrap<T> {
    v: T
}

fn main() {
    print(wrap { v: "s" }, wrap<int> { v: 3 })
}
```

```text
wrap { v: "s" } wrap { v: 3 }
```

## Bounds

A bound is written `T: interface`. Several are joined with `+`. Inside the function you may use anything the bounds provide, such as `==` for `eq` and `<` for `order`.

```pelago
fn two<T: eq + order>(a: T, b: T) -> bool = a == b || a < b

fn main() {
    print(two(1, 2), two("b", "a"))
}
```

```text
true false
```

## where clauses

A `where` after the signature moves the bounds out of the angle brackets, which reads better when there are many:

```pelago
fn pick<T, U>(a: T, b: U) -> T where T: order = a

fn main() {
    print(pick(1, "x"))
}
```

```text
1
```

## Edge cases

- The built-in collections are generic: `[T]`, `map<K, V>`, `set<T>`, `option`, `result`.
- A bound is checked where the generic function is called, with a message naming the missing interface.
- Methods called through a bound, such as `x.eq(y)`, `x.cmp(y)`, `x.hash()` and `x.clone()`, work for any type that provides them; see [Interfaces in core](../../library/core/interfaces/index.md).
- Variadic generics are not available, so a function takes a fixed number of type parameters.

## Related

- [Interfaces](./interface.md), [Structs](./struct.md), [Enums](./enum.md)
