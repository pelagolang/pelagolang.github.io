---
title: str
description: "A view of UTF-8 text owned by something else, and every method that reads text: search, split, trim, slice, case, padding."
---

`str` is a borrowed view of text: a pointer and a length, with no ownership. It is what slicing, `trim`, `split`, `lines` and `stripPrefix` return, so a pipeline of them copies nothing. Every method below also works on a [`string`](./string.md); a `string` can be passed wherever a `str` is expected.

A `str` is valid while the text it views is alive. Keep the owning `string` around as long as you use the pieces.

## Size

| Method | Result | Behaviour |
| --- | --- | --- |
| `len()` | `int` | Length in **bytes**. |
| `isEmpty()` | `bool` | `len() == 0`. |
| `charCount()` | `int` | The number of characters. Walks the text, so it is not constant time. |

## Slicing

`s[a..b]` is the bytes from `a` up to but not including `b`. `s[a..=b]` includes `b`, and `s[a..]` and `s[..b]` leave out one end. The result is a `str`. A range outside `0..len()` stops with `stopped: slice out of range`. The positions are bytes, and a position inside a multi-byte character is not detected.

```pelago
fn main() {
    const s = "héllo"
    print(s.len(), s.charCount(), s[0..1], s[1..3])
    const t = "abc"
    print(t[1..], t[..2], t[..=1], t[0..0] == "")
}
```

```text
6 5 h é
bc ab ab true
```

## Iterating

| Method | Result | Behaviour |
| --- | --- | --- |
| `chars()` | `iter<char>` | Decodes UTF-8; `for c of s.chars()` builds no list. |
| `bytes()` | `iter<byte>` | The raw bytes. |
| `byteAt(i)` | `byte` | One byte. Out of range stops with `byteAt: index out of range`. |
| `lines()` | `iter<str>` | Lines without `\n` or `\r\n`. A final line end does not make an empty line; `"".lines()` is empty. |
| `split(sep)` | `iter<str>` | Pieces between occurrences of `sep`. Adjacent separators give empty pieces. An empty `sep` never matches, so the whole text is one piece. |

```pelago
fn main() {
    print("a\r\nb\n\nc".lines().toList(), "".lines().toList(), "a\n".lines().toList())
    print("a,,b".split(",").toList(), ",a,".split(",").toList(), "abc".split("").toList())
    var sum = 0
    for c of "héy".chars() {
        sum += c to int
    }
    print(sum)
    for b of "AB".bytes() {
        print(b)
    }
}
```

```text
["a", "b", "", "c"] [] ["a"]
["a", "", "b"] ["", "a", ""] ["abc"]
458
65
66
```

## Searching

| Method | Result | Behaviour |
| --- | --- | --- |
| `contains(part)` | `bool` | |
| `startsWith(p)`, `endsWith(p)` | `bool` | The empty text starts and ends every text. |
| `find(part)` | `int?` | The byte position of the first match, or `none`. `find("")` is `some(0)`. |
| `findLast(part)` | `int?` | The position of the last match. |
| `stripPrefix(p)`, `stripSuffix(p)` | `str?` | The rest, or `none` when the text does not start or end with it. |
| `splitOnce(sep)` | `(str, str)?` | Split at the first `sep`; `none` when it is absent. The second piece may be empty. |

```pelago
fn main() {
    const s = "hello, wörld, hello"
    print(s.find("hello"), s.find("xyz"), s.findLast("hello"))
    print(s.len(), s.charCount())
    print("key=value=x".stripPrefix("key="), "file.pel".stripSuffix(".rs"))
    print("a=b=c".splitOnce("="), "ab".splitOnce("="), "a=".splitOnce("="))
    print("abc".contains("bc"), "abc".startsWith(""), "abc".endsWith("bc"))
}
```

```text
some(0) none some(15)
20 19
some("value=x") none
some(("a", "b=c")) none some(("a", ""))
true true true
```

## Trimming

`trim()` removes leading and trailing white space; `trimStart()` and `trimEnd()` remove one side. White space here is space, tab, line feed and carriage return. They return a `str` view.

## Producing new text

| Method | Result | Behaviour |
| --- | --- | --- |
| `toUpper()`, `toLower()` | `string` | ASCII letters only. |
| `replace(from, to)` | `string` | Every non-overlapping occurrence, left to right. An empty `from` changes nothing. |
| `repeat(n)` | `string` | The text `n` times. `n` of 0 or less gives the empty string. |
| `padLeft(width, c)`, `padRight(width, c)` | `string` | Fill with the character `c` up to `width` **characters**; text that is already long enough is unchanged. |

```pelago
fn main() {
    print("[#("  \t x \n".trim())]", "[#("  x ".trimStart())]", "[#("  x ".trimEnd())]")
    print("aaa".replace("aa", "b"), "abc".replace("", "-"), "é".toUpper(), "ABC".toLower())
    print("x".repeat(0) == "", "ab".repeat(3), "7".padLeft(3, '0'), "7".padRight(3, '-'), "long".padLeft(2, '0'))
}
```

```text
[x] [x ] [  x]
ba abc é abc
true ababab 007 7-- long
```

## Converting to numbers

`parseInt()` and `parseFloat()` return results; see [Parsing numbers](./parsing.md). There is also `parseFloat16()`, `parseFloat128()` and `parseFloat256()` for the [other float formats](../primitives/float128.md#parsing).

## Related

[`string`](./string.md), [Parsing numbers](./parsing.md), [`char`](../primitives/char.md), [Lists](../lists.md) (`join`), [Iterators](../lists.md)
