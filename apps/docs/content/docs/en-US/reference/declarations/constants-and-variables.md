---
title: Constants and variables
description: "const and var: grammar, the rules for changing a binding and for leaving it unset."
---

```text
const name = value
const name: type = value
var name = value
var name: type = value
```

A `const` is fixed once it is created. A `var` can be assigned again. Both can be written at the top of a module or inside a body, and the type can be left out when the value shows it.

```pelago
const limit = 10
const name: string = "pelago"
var counter: int = 0

fn bump() { counter += 1 }

fn main() {
    bump()
    bump()
    print(limit, name, counter)
}
```

```text
10 pelago 2
```

## A const cannot change

```pelago error
const x = 1
fn main() { x = 2 }
```

```text
main:2:13: error: `x` is a `const`, so it cannot be changed; declare it with `var`
```

## A variable needs a value

There is no uninitialised variable. A `var` is given its value where it is declared:

```pelago error
fn main() {
    var c: int
    print(c)
}
```

```text
main:2:9: error: a variable must be given a value when it is created
```

## Copying a const into a var

Values are copied, so changing the `var` does not change the `const` it came from:

```pelago
fn main() {
    const a = 5
    var b = a
    b += 1
    print(a, b)
}
```

```text
5 6
```

## Related

- [Values and copies](../../guide/ownership/values-and-copies.md)
- [Values and variables](../../guide/values.md)
