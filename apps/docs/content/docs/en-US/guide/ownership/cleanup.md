---
title: Cleanup and deinit
description: "When a value is released, how deinit runs and in what order, assignment and scope exit, defer, and finding leaks with --leak-check."
---

A value is released when its owner goes out of scope, when the owner is assigned a new value, or when the owner is consumed. Memory is freed then, and nothing else frees it. If the type declares `deinit`, the body runs first.

## deinit

`deinit` is a block inside a `struct` or `obj` with `self` bound to the value. It is the place to close a file, release a lock or print a trace. 

```pelago
struct handle {
    name: string

    deinit { print("closing #(self.name)") }
}

fn use_it(sink h: handle) {
    print("using #(h.name)")
}

fn main() {
    const a = handle { name: "a" }
    {
        const b = handle { name: "b" }
        print("inner")
    }
    const c = handle { name: "c" }
    use_it(sink c)
    print("end")
}
```

```text
inner
closing b
using c
closing c
end
closing a
```

Locals are released in reverse order of declaration. A value that was moved is released by its new owner: `c` closed when `use_it` ended, not at the end of `main`.

## Fields

A type's own `deinit` runs first, then its fields are released in declaration order, each running its own `deinit`.

```pelago
struct inner {
    n: int
    deinit { print("inner #(self.n)") }
}

struct outer {
    a: inner
    b: inner
    deinit { print("outer") }
}

fn main() {
    const o = outer { a: inner { n: 1 }, b: inner { n: 2 } }
    print("start")
}
```

```text
start
outer
inner 1
inner 2
```

## Assignment and lists

Assigning to a variable releases the old value immediately. A list releases its elements in order when the list goes away.

```pelago
struct h {
    n: int
    deinit { print("drop #(self.n)") }
}

fn main() {
    var x = h { n: 1 }
    x = h { n: 2 }
    print("after")
    const l = [h { n: 7 }, h { n: 8 }]
    print("end")
}
```

```text
drop 1
after
end
drop 7
drop 8
drop 2
```

## defer and early exit

Release also happens on every early exit (`return`, `?`, `break`, `continue`), so no `finally` is needed. For cleanup that belongs next to the code it follows, use [`defer`](../control-flow/defer.md).

## A stop does not clean up

A [stop](../errors.md) (a failed check, overflow, an index out of range) ends the program at once. `deinit` and `defer` do not run.

## Finding leaks

Run or build with `--leak-check` and the program reports how many allocations were still live at the end, then exits with status 3:

```text
leaked 2 allocation(s)
```


## Edge cases

- A field cannot be moved out of a struct (`a.n cannot be taken out of a`), with or without a `deinit`; use `copy a.n`.
- A `copy` of a value with `deinit` has two owners and runs it twice.

## Related

- [Moves](./moves.md), [Boxes](./box.md), [defer](../control-flow/defer.md)
