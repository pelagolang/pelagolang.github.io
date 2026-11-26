---
title: slices
description: "xs[a..b] and s[a..b]: temporary windows onto part of a list, array or text, what they cost, what they may not do and what is not built yet."
---

A slice is a window onto part of a list, an array or a piece of text. Nothing is copied: the window is a pointer and a length into the original. It lasts for one statement or one call.

| Written | Of | Type | Copies? |
| --- | --- | --- | --- |
| `xs[a..b]`, `xs[a..]`, `xs[..b]`, `xs[a..=b]` | list or array | a read-only list view | no |
| `s[a..b]` and the other forms | `string` or `str` | `str` | no |
| `copy xs[a..b]` | list or array | `[T]`, an owned list | yes |

```pelago
fn sum(xs: [int]) -> int {
    var t = 0
    for x of xs {
        t += x
    }
    return t
}

fn main() {
    const xs = [1, 2, 3, 4, 5]
    print(sum(xs[1..4]), xs[2..].len())
    const own = copy xs[1..3]
    print(own)
    const word = "hello world"[0..5]
    print(word)
}
```

```text
9 3
[2, 3]
hello
```

## Rules

- **A window cannot be kept.** It cannot be stored in a variable of type `[T]`, put in a struct, or returned. The compiler says ``` `xs[1..3]` cannot be taken out of `xs`; write `copy xs[1..3]` ```.
- **One check, when it is made.** The bounds `0 <= a <= b <= len` are checked once; a failure stops with `stopped: slice out of range`.
- **No overlap with a change.** `f(xs[0..2], xs!)` is rejected, because the call changes `xs` and also reads a window of it.
- **Text positions are bytes.** `s[a..b]` does not check that a position falls between characters.

## Not built yet

- **Changing part of a list through a window.** `sort!(xs[1..3]!)` and `xs[1..4].sort!()` pass the checker and then stop with `not lowered yet: an inout argument that is not a place`. Until it is built, copy the part, change the copy and write it back.
- **Keeping a `str` view of a string you then change.** A `str` taken from a heap string and kept in a variable is not protected when the string is reassigned or changed afterwards; do not use the view after that. This is a known gap and is being fixed.
- **A named slice type.** The window type is planned as `[T..]` (long spelling `slice<T>`) for parameters that change a window without being able to grow it.
