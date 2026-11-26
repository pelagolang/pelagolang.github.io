---
title: Tail calls (become)
description: "become makes a guaranteed tail call that reuses the stack frame: deep recursion and mutual recursion in constant stack."
---

`become f(args)` ends the current function by calling `f` and **reusing the stack frame**: the call is a jump, so recursion that ends in `become` runs in constant stack however deep it goes. A plain recursive call would overflow the stack.

```pelago
fn sum(n: int, acc: int) -> int {
    if n == 0 {
        return acc
    }
    become sum(n - 1, acc + n)
}

fn main() {
    print(sum(100000, 0))
}
```

```text
5000050000
```

## Mutual recursion

`become` works between different functions too:

```pelago
fn even(n: int) -> bool {
    if n == 0 {
        return true
    }
    become odd(n - 1)
}

fn odd(n: int) -> bool {
    if n == 0 {
        return false
    }
    become even(n - 1)
}

fn main() {
    print(even(100001))
}
```

```text
false
```

## Rules

- The call must be the last thing the function does.
- It cannot follow a `defer` in the same function.
- Unlike an optimisation, `become` is a promise that the call is a jump, not just a hint.

## Related

[Functions](../functions.md#tail-calls), [defer](./defer.md)
