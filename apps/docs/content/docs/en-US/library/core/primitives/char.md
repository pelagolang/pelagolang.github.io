---
title: char
description: "One Unicode scalar value: literals, escapes, the classification methods, conversions and what is ASCII-only."
---

A `char` holds one Unicode scalar value: any code point from `U+0000` to `U+10FFFF` except the surrogate range. It is a single character, not a byte and not a string. The text type [`string`](../strings.md) is UTF-8, and `s.chars()` decodes it into `char` values.

## Writing a value

A character literal is written in single quotes and holds exactly one character.

| Literal | Value |
| --- | --- |
| `'a'`, `'é'`, `'語'` | The character itself. |
| `'\n'` `'\t'` `'\r'` `'\0'` | Newline, tab, carriage return, NUL. |
| `'\\'` `'\''` | Backslash and single quote. |
| `'\u{e9}'` | A code point by number, in hexadecimal. |

Two or more characters between single quotes is the error ``a character literal holds exactly one character, like 'a'``. Use a string for text. Inside a `#( )` hole of a string you cannot write a quote-bearing literal, so put the `char` in a `const` first.

```pelago
fn main() {
    const a = 'a'
    const tab = '\t'
    const e = '\u{e9}'
    print("#a #(a to int) #(tab to int) #e #(e to int)")
}
```

```text
a 97 9 é 233
```

## Methods

| Method | Result | Behaviour |
| --- | --- | --- |
| `isDigit()` | `bool` | `'0'` to `'9'` only. |
| `isUpper()` | `bool` | `'A'` to `'Z'` only. |
| `isLower()` | `bool` | `'a'` to `'z'` only. |
| `isAlpha()` | `bool` | `isUpper() \|\| isLower()`. |
| `isSpace()` | `bool` | Space, tab, line feed and carriage return. |
| `toUpper()` | `char` | The capital for `'a'` to `'z'`; every other character is returned unchanged. |
| `toLower()` | `char` | The small letter for `'A'` to `'Z'`; every other character is returned unchanged. |

**All of these look at ASCII only.** `'é'.isAlpha()` is `false`, `'é'.isLower()` is `false` and `'é'.toUpper()` is `'é'`. Vertical tab, form feed and the Unicode spaces (such as `U+00A0`) are not `isSpace()`. Full Unicode classification and case mapping are not part of `core` yet.

```pelago
fn main() {
    const e = '\u{e9}'
    const nbsp = '\u{a0}'
    print("#('q'.isAlpha()) #('Q'.isUpper()) #('7'.isDigit()) #(' '.isSpace())")
    print("#('q'.toUpper()) #('Q'.toLower()) #('7'.toUpper())")
    print("#(e.isAlpha()) #(e.toUpper()) #(nbsp.isSpace())")
}
```

```text
true true true true
Q q 7
false é false
```

## Comparison

`==`, `!=`, `<`, `>`, `<=` and `>=` compare code points, so `'a' < 'b'` and `'é' > 'z'` are both `true`. A `char` is `eq`, `order` and `hash`, so it can be a map key, a set member and a sort key. Ranges work: `c in 'a'..='z'`.

## Converting

| From | To | How |
| --- | --- | --- |
| `char` | `int` | `c to int` gives the code point. Lossless, so `to` accepts it. |
| `int` | `char` | Not allowed with `to`: not every integer is a scalar value. |
| `char` | text | `"#c"` or `print(c)`. |
| `char` | `string` | Build it with interpolation: `"#c"`. |

Arithmetic on characters goes through `int`: `(c to int) + 1` is the code point after `c`.

## Edge cases

- `'\0'` is a legal `char`. It has code point 0 and is not a terminator.
- `'\u{d800}'` (a surrogate) and anything above `'\u{10ffff}'` are not valid scalar values.
- `s.charCount()` counts characters, `s.len()` counts bytes. For `"é"` they are 1 and 2.

## Not finished

- Unicode-aware `isAlpha`, `isUpper`, `isLower`, `isSpace` and case mapping.
- A way to turn an integer into a `char` that returns an option.

## Related

- [Strings](../strings.md): `chars()`, `padLeft`, and everything else that takes a `char`.
- [`bool`](./bool.md), [`int`](./int.md)
- [Lexical structure](../../../reference/lexical.md): the full escape table.
