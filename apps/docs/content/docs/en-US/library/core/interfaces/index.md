---
title: Interfaces
description: "The interfaces declared in core: show, eq, order, hash, clone, the operator interfaces and converts, and which types have them already."
---

An interface lists methods a type can provide. `core` declares the ones the language itself relies on: printing, comparing, hashing, copying and the operators. A type gets one in three ways: it is built in (the primitives and collections), it is derived with `@derive(...)`, or you write `impl name for type Ellipsis`.

| Interface | Method | Enables | Page |
| --- | --- | --- | --- |
| `show` | `fn show(self) -> string` | `print`, `#( )` strings | [show](./show.md) |
| `eq` | `fn eq(self, other: Self) -> bool` | `==`, `!=` | [eq](./eq.md) |
| `order : eq` | `fn cmp(self, other: Self) -> int` | `<` `>` `<=` `>=`, sorting, `min`, `max` | [order](./order.md) |
| `hash : eq` | `fn hash(self) -> int` | map keys, set members | [hash](./hash.md) |
| `clone` | `fn clone(self) -> Self` | `copy` on an `obj` | [clone](./clone.md) |
| `add` `sub` `mul` `div` `rem` `neg` | `fn add(self, other: Self) -> Self` and so on | `+ - * / %` and unary `-` | [operators](./operators.md) |
| `converts<E>` | `fn convert(self) -> E` | `?` between error types | [converts](./converts.md) |

## What each kind of type has

| Type | show | eq | order | hash | clone |
| --- | --- | --- | --- | --- | --- |
| `bool`, `char`, integers, `string` | yes | yes | no for `bool`, yes for the rest | yes | yes |
| `float` | yes | yes | yes | no meaningful | yes |
| `list`, `map`, `set`, tuples | when elements are | when elements are | lists when elements are | no | yes |
| `struct`, `enum` you write | **write `@derive(show)` or `impl show`** | automatic | `@derive(order)` or `impl order` | `impl hash` | automatic |
| `obj` you write | same as struct | `@derive(eq)` or `impl eq` | `@derive(order)` or `impl order` | `@derive(hash)` or `impl hash` | `@derive(clone)` or `impl clone` |

## Using an interface as a bound

A generic function can require an interface with a bound, and a list can hold values of different types through `any`:

```pelago
fn biggest<T: order>(a: T, b: T) -> T = a > b ? a : b

fn show_all(xs: [any show]) {
    for x of xs {
        print(x)
    }
}

fn main() {
    print(biggest(3, 9), biggest("a", "b"), biggest(2.5, 1.5))
    show_all([1, "a", 2.5, true])
}
```

```text
9 b 2.5
1
a
2.5
true
```

## Related

[Types guide](../../../guide/types/index.md), [Generics](../../../guide/types/generics.md)
