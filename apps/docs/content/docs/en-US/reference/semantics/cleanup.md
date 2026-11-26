---
title: Cleanup
description: "Release order, deinit and defer."
---

When a scope ends, the values it owns are released in reverse order of declaration, running each type's `deinit` first. A value moved out earlier is released by its new owner.

```pelago
struct res {
    name: string
    deinit { print("drop #(self.name)") }
}

fn main() {
    const a = res { name: "a" }
    const b = res { name: "b" }
    print("end")
}
```

```text
end
drop b
drop a
```

A `defer` statement runs when its block ends, including by `return`, `?`, `break` or `continue`, in reverse order of declaration. It does not run when the program stops.

```pelago
fn main() {
    defer print("one")
    defer print("two")
    print("body")
}
```

```text
body
two
one
```

A program that ends with allocations still live is reported by `--leak-check`.

## Related

- [Cleanup and deinit](../../guide/ownership/cleanup.md)
