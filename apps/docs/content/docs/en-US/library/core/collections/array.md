---
title: array
description: "The fixed-size inline sequence [T; N]: how it differs from a list, how to write, index, copy and pass it, and what stops the program."
---

`[T; N]` is an array: exactly `N` values of one type, stored **inline**. `N` is part of the type, so `[int; 3]` and `[int; 4]` are different types. An array lives in the stack frame or inside the struct that holds it. It never allocates, needs no cleanup and has no pointer behind it.

## Array or list

| | `[T; N]` array | `[T]` list |
| --- | --- | --- |
| Storage | Inline, `N` times the size of `T` | A header of three words pointing to a heap buffer the list owns |
| Length | Fixed, written in the type | Changes at run time |
| Growing methods (`push!`, `pop!`, `insert!`, `remove!`, `clear!`) | None | Yes |
| Cleanup | None for plain elements | Frees its buffer when its owner ends |

Use an array when the size is known and small (a board, a vector of 3 floats, a block of bytes). Use a list when the size changes.

## Writing a value

`[1, 2, 3]` is a literal. Give the type to make it an array, and `[value; count]` repeats one value:

```pelago
fn main() {
    var grid: [int; 4] = [0; 4]
    grid[2] = 7
    const names: [string; 2] = ["ann", "bo"]
    print(grid, grid.len(), names)
}
```

```text
[0, 0, 7, 0] 4 ["ann", "bo"]
```

A literal with the wrong number of items is a compile error: `this array has 2 items, but 3 are expected`.

## Indexing and slicing

`a[i]` reads and `a[i] = v` writes. An index outside `0..N` stops the program with `stopped: index out of range`. The compiler does not reject a constant index such as `a[3]` on a 3-array; it stops when it runs. `a[1..3]` is a [slice](./slice.md).

## Copying and passing

Plain data copies freely, so assigning an array makes an independent second array:

```pelago
fn fill(g!: [int; 3]) {
    g[1] = 9
}

fn total(g: [int; 3]) -> int = g[0] + g[1] + g[2]

fn main() {
    var a: [int; 3] = [1, 2, 3]
    var b = a
    b[2] = 7
    fill(a!)
    print(a, b, total(a))
}
```

```text
[1, 9, 3] [1, 2, 7] 13
```

- A read-only parameter (`g: [int; 3]`) is passed by address, nothing is copied.
- `g!` (`inout`) lets the function change the caller's array.
- `sink` hands the array over.
- An array of owning values (strings, lists) moves like any owning value and needs `copy` to keep two.
- A struct that holds an array copies it with the struct.

## Arrays and lists

A list becomes an array with `xs.toArray<N>()` (an `option`: `none` when the length differs) or `xs.asArray<N>()` (stops the program on a mismatch). `N` can be a `meta` parameter, so code can be written over any size. In JSON an array is a flat array.
