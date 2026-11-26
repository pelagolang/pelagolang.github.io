---
title: option
description: "T?: a value that may be absent: making one, taking it apart, every method, ??, ?. and ?."
---

`T?` (long form `option<T>`) is either a `T` or `none`. A function that may have nothing to return says so in its type, and the compiler makes the caller deal with it.

## Making and testing

A value of type `T` converts to `T?` where one is expected: `const a: int? = 5`. `none` is the empty value. Take one apart with `switch` or `is`:

```pelago
fn main() {
    const a: int? = 3
    switch a {
        case some(v): print("got #v")
        case none: print("nothing")
    }
    if a is some(v) {
        print(v)
    }
}
```

```text
got 3
3
```

## Operators

| Operator | Meaning |
| --- | --- |
| `a ?? b` | `a` if present, otherwise `b`. |
| `a ??= b` | Assign `b` to `a` when `a` is `none`. |
| `a?.f` | The field or method `f` of `a` when present, otherwise `none`. A field that is itself an option is flattened: `x?.age` is `int?`, not `int??`. |
| `e?` | In a function that returns an option or a result: unwrap `e`, or return `none` from the function straight away. |

```pelago
fn main() {
    struct u { name: string, age: int? }

    var v: int? = none
    v ??= 4
    v ??= 9
    const x: u? = u { name: "a", age: 3 }
    const y: u? = none
    print(v, x?.name, y?.name, x?.age, (x?.age) ?? 0)
}
```

```text
some(4) some("a") none some(3) 3
```

```pelago
fn first(xs: [int]) -> int? {
    const f = xs.first()?
    f + 1
}

fn main() {
    print(first([1]), first([]))
}
```

```text
some(2) none
```

## Methods

| Method | Result | Behaviour |
| --- | --- | --- |
| `isSome()`, `isNone()` | `bool` | |
| `unwrapOr(x)` | `T` | The value, or `x`. Same as `?? x`, but always evaluates `x`. |
| `unwrapOrElse(f)` | `T` | The value, or `f()`, which runs only when needed. |
| `map(f)` | `U?` | Transform the value when present. |
| `andThen(f)` | `U?` | `f` returns an option; `none` stays `none`. |
| `filter(f)` | `T?` | Keep the value only when `f` holds. |
| `orElse(f)` | `T?` | The option itself, or `f()` when it is `none`. |
| `isSomeAnd(f)` | `bool` | Present, and `f` holds. |
| `zip(other)` | `(T, U)?` | Both values, or `none` if either is missing. |
| `orErr(e)` | `T ! E` | Turn `none` into the error `e`. |

```pelago
fn main() {
    const a: int? = 5
    const n: int? = none
    print(a, n, a ?? 0, n ?? 0, a.isSome(), n.isNone(), a.isSomeAnd(x ~> x > 9))
    print(a.map(x ~> x + 1), n.map(x ~> x + 1), n.orElse(() ~> 3), a.unwrapOrElse(() ~> 0), n.unwrapOrElse(() ~> 42))
    print(a.orErr("none!"), n.orErr("none!"))
    print(a.filter(x ~> x > 9), a.zip("x"))
}
```

```text
some(5) none 5 0 true true false
some(6) none some(3) 5 42
ok(5) err("none!")
none some((5, "x"))
```

## Where options come from

`list.get`, `first`, `last`, `pop!`, `indexOf`, `map.get`, `remove!`, `str.find`, `stripPrefix`, `splitOnce`, the checked integer methods (`checkedAdd`, `toByteChecked`), `iter.find`, `min`, `max` and `nth`.

## Edge cases

- An option of an option (`int??`) is not a type you can write.
- `none` needs a known type: `const x = none` is an error; write `const x: int? = none`.

## Related

[`result`](./result.md), [Errors and options (guide)](../../../guide/errors.md), [Operators](../../../reference/operators/index.md)
