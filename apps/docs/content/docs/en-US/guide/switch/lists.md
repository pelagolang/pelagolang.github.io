---
title: List patterns
description: "Matching the shape of a list: empty, exact lengths, first and last, head and tail, and literals inside."
---

A list pattern matches the shape of a list, with `...` standing for the rest. It replaces most index arithmetic.

```pelago
fn describe(xs: [int]) -> string {
    switch xs {
        case []: "empty"
        case [x]: "one: #x"
        case [first, ..., last]: "from #first to #last"
    }
}

fn sum_list(xs: [int]) -> int {
    switch xs {
        case []: 0
        case [h, ...t]: h + sum_list(t)
    }
}

fn main() {
    print(describe([]))
    print(describe([7]))
    print(describe([1, 2, 3]))
    print("#(sum_list([1, 2, 3, 4]))")
}
```

```text
empty
one: 7
from 1 to 3
10
```

## Forms

| Pattern | Matches |
| --- | --- |
| `[]` | The empty list. |
| `[a, b]` | A list of exactly two items, bound to `a` and `b`. |
| `[first, ..., last]` | Two or more items; `...` skips the middle. |
| `[h, ...t]` | At least one item: the first, and the rest as a list `t`. |
| `[cmd, ...]` | At least one item, ignoring the rest. |

## Literals inside

```pelago
fn command(line: string) -> string {
    switch line.split(" ").toList() {
        case ["add", name]: "adding #name"
        case ["rename", old, new]: "renaming #old to #new"
        case [cmd, ...]: "unknown command #cmd"
        case []: "empty"
    }
}

fn main() {
    print(command("add bob"))
    print(command("rename a b"))
    print(command("zap"))
}
```

```text
adding bob
renaming a to b
unknown command zap
```

## Edge cases

- A list pattern always needs `default` or a case that covers every length (for example `[]` then `[h, ...t]`).

## Related

- [List](../../library/core/collections/list.md), [Guards, default and exhaustiveness](./guards-default.md)
