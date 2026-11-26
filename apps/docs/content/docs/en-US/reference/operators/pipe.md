---
title: Pipe
description: "x |> f calls f(x); also ~> and the spread forms."
---

`x |> f` calls `f(x)` and chains left to right:

```pelago
fn double(x: int) -> int = x * 2
fn inc(x: int) -> int = x + 1

fn main() {
    print(3 |> double |> inc)
}
```

```text
7
```

`~>` separates a closure's parameters from its body (see [Functions](../../guide/functions.md)). `...rest` in a pattern binds the rest of a list, and `...xs` in a call passes a list as separate arguments.
