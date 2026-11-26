---
title: slices and windows
description: "xs[a..b] and the window type [T..] (slice<T>): borrowed parts of a list, array or text, what they cost, what they may not do and how to pass one to a function."
---

A slice is a window onto part of a list, an array or a piece of text. Nothing is copied: the window is a pointer and a length into the original. It lasts for one statement or one call, and it is never stored.

| Written | Of | Type | Copies? |
| --- | --- | --- | --- |
| `xs[a..b]`, `xs[a..]`, `xs[..b]`, `xs[a..=b]` | list or array | a window, `[T..]` | no |
| `s[a..b]` and the other forms | `string` or `str` | `str` | no |
| `copy xs[a..b]` | list or array | `[T]`, an owned list | yes |

## The window type `[T..]`

`[T..]` (long spelling `slice<T>`, both mean the same) is the type of a window. It is written on a **parameter** that wants to read or change part of a sequence without owning it. A list, an array or a window `xs[a..b]` can be passed to it.

```pelago
fn sum(xs: [int..]) -> int {
    var t = 0
    for x of xs {
        t += x
    }
    return t
}

fn bump(xs!: [int..]) {
    for inout x of xs {
        x += 100
    }
}

fn main() {
    var xs = [1, 2, 3, 4, 5]
    print(sum(xs[1..4]), sum(xs))
    bump(xs[1..3]!)
    print(xs)
    xs[2..].sort!()
    var a: [int; 4] = [4, 3, 2, 1]
    bump(a[..2]!)
    print(a)
    const own = copy xs[1..3]
    print(own)
}
```

```text
9 15
[1, 102, 103, 4, 5]
[104, 103, 2, 1]
[102, 4]
```

A window can be indexed, measured with `len()`, iterated, and, through an `inout` parameter, have its elements changed. A window of a window works too.

## Rules

- **A window cannot be kept.** It cannot be stored in a variable of type `[T]`, put in a struct, or returned (`a window cannot be returned ... return a list (copy w)`). Take an owned list with `copy w`.
- **A window cannot grow.** `push!`, `pop!`, `insert!`, `remove!`, `clear!`, `extend!`, `retain!`, `truncate!`, `dedup!` and `reserve!` on `xs[a..b]` or on a `[T..]` parameter are compile errors: a window only borrows part of a list, so it has no right to change the list's length. Changing elements (`sort!`, `reverse!`, `swap!`, `w[i] = v`) is fine.
- **A window cannot go to a growing parameter.** Passing `xs[1..3]!` or a `[T..]` value to a parameter declared `xs!: [T]` is an error, because that function may call `push!`. Declare the parameter as `[T..]`, or pass the whole list.
- **No `sink`.** A window does not own what it covers, so `w!!: [T..]` is rejected.
- **One check, when it is made.** The bounds `0 <= a <= b <= len` are checked once; a failure stops with `stopped: slice out of range`.
- **No overlap with a change.** `f(xs[0..2], xs!)` is rejected, because the call changes `xs` and also reads a window of it.
- **A `str` view follows its text.** A `str` taken from a heap string and kept in a variable stops being usable when the string is reassigned, changed or moved: the compiler says ``` `v` points into `s`, which was changed or moved on line N ```. Keep a `string` (`... to string`) if you need the text afterwards.
- **Text positions are bytes.** `s[a..b]` does not check that a position falls between characters.

## What it costs

A window is a pointer and a length, the same size as a list header, and nothing is allocated or freed for it. The fat pointer is conventional (Rust's `&mut [T]`, C++ `span`). What is Pelago's own is how it is kept safe: the `let`/`inout` access modes already forbid two overlapping accesses, so there is no runtime aliasing check.

## Not built yet

- A window of a `str` or `string` is the `str` type, not `[T..]`.
- `[T..]` appears only on parameters and locals; fields and return types are rejected on purpose.
