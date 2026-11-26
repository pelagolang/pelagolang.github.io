---
title: Boxes
description: "box<T>: a value stored on the heap, recursive types, get, set! and take!!, and how a box is copied and released."
---

Values live where they are declared, so a type cannot contain itself directly. A `box<T>` stores its value on the heap and is a fixed-size handle to it. That is what lets a type refer to itself, as a tree does.

```pelago
enum tree {
    leaf
    node(box<tree>, int, box<tree>)
}

fn sum(t: tree) -> int {
    switch t {
        case .leaf: 0
        case .node(l, v, r): sum(l.get()) + v + sum(r.get())
    }
}

fn main() {
    const t = tree.node(box(tree.leaf), 5, box(tree.leaf))
    print(sum(t))
}
```

```text
5
```

## Making and using a box

`box(value)` allocates and moves the value in. Three methods work on it:

| Method | Result | Meaning |
| --- | --- | --- |
| `get()` | `T` | Read the content. |
| `set!(value)` | | Replace the content, releasing the old one. |
| `take!!()` | `T` | Move the content out and consume the box. |

```pelago
fn main() {
    const b = box(5)
    print(b.get())
    var c = box([1, 2])
    c.set!([3])
    print(c.get())
    const v = c.take!!()
    print(v)
}
```

```text
5
[3]
[3]
```

## Ownership

A box owns its content: moving the box moves the handle, `copy` of a box allocates a second box with a deep copy, and releasing the box releases the content (running its `deinit`). There is no sharing between boxes.

## When to use a box

- A recursive type: a tree, a linked list, an expression syntax tree.
- A large value you want to move cheaply: moving a box moves one pointer.

Shared ownership with reference counting is not part of `core` today.

## Edge cases


## Related

- [Moves](./moves.md), [Cleanup](./cleanup.md), [Types](../types/index.md)
