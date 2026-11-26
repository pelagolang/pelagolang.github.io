---
title: bool
description: "The truth type: true and false, the logical operators, short-circuiting and conditions."
---

`bool` has exactly two values, `true` and `false`. It is the type of every comparison and the only type an `if`, `while` or `?:` condition accepts: there is no "truthy" or "falsy", so `if n { ... }` with an `int` is an error.

```pelago
fn main() {
    const ready: bool = 3 > 2
    var attempts = 0
    while !ready || attempts < 2 {
        attempts += 1
    }
    print("#ready #attempts")
}
```

```text
true 2
```

## Writing a value

`true` and `false` are literals. They are hard keywords, so they cannot be used as names.

## Operators

| Operator | Meaning | Notes |
| --- | --- | --- |
| `!a` | Logical not. | Prefix. |
| `a && b` | Logical and. | Short-circuits: `b` runs only when `a` is `true`. |
| `a \|\| b` | Logical or. | Short-circuits: `b` runs only when `a` is `false`. |
| `a == b`, `a != b` | Equal, not equal. | |
| `c ? x : y` | Choose `x` when `c` is `true`, otherwise `y`. | `c` must be a `bool`. |

`&&` binds tighter than `||`, and both bind looser than comparisons, so `a < b && b < c` needs no parentheses. The full table is in [Operators](../../../reference/operators.md).

`bool` has no ordering: `true < false` is rejected with ``error: `bool` cannot be ordered with `<` ``. The bitwise operators `&`, `|` and `^` work on integers, not on `bool`; use `&&` and `||`.

### Short-circuiting

The right operand of `&&` and `||` is not evaluated when the left one already decides the result. That makes a guard followed by the thing it protects safe to write in one condition.

```pelago
fn main() {
    const xs: [int] = []
    if xs.len() > 0 && xs[0] == 1 {
        print("starts with one")
    } else {
        print("nothing to check")
    }
}
```

```text
nothing to check
```

Without the short-circuit, `xs[0]` would stop the program for an index out of range.

## Converting

| From | To | How |
| --- | --- | --- |
| `bool` | `int` | `flag to int` gives `1` for `true` and `0` for `false`. |
| `int` | `bool` | Not allowed. Compare instead: `n != 0`. |
| `bool` | text | `"#flag"` or `print(flag)` writes `true` or `false`. |

```pelago
fn main() {
    const yes = true
    const no = false
    print("#(yes to int) #(no to int)")
    const n = 7
    print(n != 0)
}
```

```text
1 0
true
```

## Equality, hashing and ordering

`==` and `!=` work as for every plain type. A `bool` can be a map key, a set member and a struct field. It is not `order`, so it cannot be sorted or compared with `<`.

## Edge cases

- A condition must be a `bool` exactly. There is no conversion from numbers, text, options or lists.
- `!` applies to `bool` only. For an integer, `~` flips the bits.
- `x ?? y` is for options, not for booleans; it never tests a `bool`.

## Related

- [Operators](../../../reference/operators.md)
- [Pattern matching](../../../guide/switch/index.md): `switch` can match `true` and `false` directly.
- [`char`](./char.md), [`int`](./int.md)
