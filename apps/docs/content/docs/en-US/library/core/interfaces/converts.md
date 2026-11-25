---
title: converts
description: "The converts interface: letting ? turn one error type into another."
---

```
pub interface converts<E> {
    fn convert(self) -> E
}
```

When `?` finds an error in a function whose result has a different error type, it calls `convert` on the error. Implement `converts<Target>` for the source error type. The interface name is a placeholder and may change.

```pelago
struct low { m: string }
struct app { m: string }

impl converts<app> for low {
    fn convert(self) -> app = app { m: "app: #(self.m)" }
}

fn step() -> int ! low {
    return err(low { m: "bad" })
}

fn run() -> int ! app {
    const v = step()?
    return ok(v)
}

fn main() {
    switch run() {
        case ok(v): print(v)
        case err(e): print(e.m)
    }
}
```

```text
app: bad
```

## Related

[`result`](../options/result.md), [Error types](../options/errors.md), [Interfaces](./index.md)
