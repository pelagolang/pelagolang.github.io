---
title: Text
description: "string and str: owned and borrowed UTF-8 text, how bytes and characters differ, and where each operation lives."
---

Text in Pelago is **UTF-8**. Two types hold it:

| Type | Owns its bytes? | Made by | Page |
| --- | --- | --- | --- |
| `string` | Yes. It can grow. | A literal, `+`, interpolation, `replace`, `toUpper`, `repeat`, `join` | [string](./string.md) |
| `str` | No. A view of text that belongs to something else. | A slice `s[a..b]`, `trim`, `split`, `lines`, `stripPrefix` | [str](./str.md) |

A `string` is accepted wherever a `str` is wanted, so a function that only reads text should take `str`. Every method of `str` is also a method of `string`. Methods that change the text, such as `pushStr!`, exist only on `string`.

Turning text into numbers is on its own page: [Parsing numbers](./parsing.md). Characters are the [`char`](../primitives/char.md) type.

## Bytes and characters

`s.len()` counts **bytes**; `s.charCount()` counts characters (Unicode scalar values). Slices use byte positions. Text cannot be indexed by position (`s[0]` is the error ``text cannot be indexed by position; use a range like `s[0..3]` or `.chars()` ``).

```pelago
fn main() {
    print("é".len(), "語".len(), "😀".len(), "😀".charCount(), "e\u{301}".charCount())
}
```

```text
2 3 4 1 2
```

The last case is two characters (`e` and a combining accent) that read as one letter: Pelago does not group characters into "graphemes".

## Comparing

`==` compares the bytes. `<` and the other orderings compare bytes lexicographically, so `"Z" < "a"` and `"é" > "z"` are both `true`. There is no locale-aware ordering.
