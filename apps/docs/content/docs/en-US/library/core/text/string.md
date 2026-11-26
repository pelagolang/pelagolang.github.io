---
title: string
description: "The owned, growable UTF-8 text type: literals, escapes, interpolation, building, comparing and memory."
---

`string` is owned UTF-8 text: a pointer, a length and a capacity. It is the type of a string literal, of `a + b`, and of everything that builds new text. Reading methods are shared with [`str`](./str.md); this page covers making and changing a `string`.

## Writing a value

A string literal is written in double quotes and may span lines. It supports the escapes `\n \t \r \0 \\ \' \" \#` and `\u{...}`, listed in [Lexical structure](../../../reference/lexical.md).

### Interpolation

`#name` puts a variable into a string and `#(expression)` puts in any expression whose type is `show`. A `#` followed by anything else is an error; write `\#` for a literal hash.

```pelago
fn main() {
    const n = 5
    const name = "Ada"
    print("#name has #n items, next is #(n + 1), a literal \#")
}
```

```text
Ada has 5 items, next is 6, a literal #
```

## Joining

`a + b` makes a new string from two texts. Both sides must be text: `"a" + 1` is the error ``+ joins text with text, but this is `{integer}` ``. To join a number, interpolate it: `"a#n"`. `+=` appends.

```pelago
fn main() {
    var s = "a"
    s += "b"
    const t = s + "c" + "d"
    const parts = ["x", "y", "z"]
    print(t, s == "ab", parts.join(", "))
}
```

```text
abcd true x, y, z
```

## Changing a string

These methods change their receiver, so they need a `var` and are called with `!`.

| Method | Behaviour |
| --- | --- |
| `pushStr!(text)` | Append text. |
| `pushChar!(c)` | Append one character, encoded as UTF-8. |
| `pushByte!(b)` | Append one raw byte. A byte that is not valid UTF-8 on its own makes the string invalid. |
| `clear!()` | Empty the string. |

Calling one on a `const` is the error ```a` is a `const`, so it cannot be changed; declare it with `var` ``.

```pelago
fn main() {
    var out = "n="
    out.pushChar!('7')
    out.pushStr!(" ok")
    out.pushByte!(33)
    print(out, out.len())
    out.clear!()
    print("[#out]", out.isEmpty())
}
```

```text
n=7 ok! 7
[] true
```

## Copying

Assigning a `string` moves it, like any value that owns memory. Use `copy` to get a second, independent string: changing one does not affect the other.

```pelago
fn main() {
    const a = "hello"
    var b = copy a
    b.pushStr!("!")
    print(a, b)
}
```

```text
hello hello!
```

## Building from bytes and lists

A list of bytes becomes text with `toText()`. A list of strings (or an iterator of them) is joined with `join(separator)`.

```pelago
fn main() {
    const bytes: [byte] = [104, 105]
    print(bytes.toText())
    print(["a", "b", "c"].join(", "), "x y z".split(" ").join("+"))
}
```

```text
hi
a, b, c x+y+z
```

## Methods that return a new string

`replace`, `toUpper`, `toLower`, `repeat`, `padLeft` and `padRight` return a new `string`; they are described on the [`str`](./str.md) page because they work on any text.

## Edge cases

- A string can hold any bytes `pushByte!` puts in it. Slicing in the middle of a character is **not checked**: `"héllo"[0..2]` returns a view that ends inside `é`, and printing it shows a replacement character. Slice at positions you got from `find` or from `len` of a known prefix.
- `toUpper` and `toLower` change ASCII letters only: `"é".toUpper()` is `"é"` and `"straße".toUpper()` is `"STRAßE"`.
- Strings compare by bytes, not by Unicode rules.

## Related

[`str`](./str.md), [Parsing numbers](./parsing.md), [`char`](../primitives/char.md), [Lists](../collections/list.md)
