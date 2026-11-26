---
title: Operators
description: "Every operator, its precedence and where its page is."
---

Pelago uses symbols for operators. Three words act as operators too: `in`, `is` and the conversion `to`.

| Group | Operators | Page |
| --- | --- | --- |
| Arithmetic | `+ - * / %`, `+% -% *%`, `**` | [Arithmetic](./arithmetic.md) |
| Comparison and logic | `== != < > <= >=`, `&& \|\|`, `!` | [Comparison and logic](./comparison.md) |
| Bitwise | `& \| ^ ~ << >>` | [Bitwise](./bitwise.md) |
| Ranges and membership | `..`, `..=`, `in` | [Ranges](./ranges.md) |
| Options | `??`, `??=`, `?.`, `?` | [Options and chaining](./options.md) |
| Conversion and tests | `to`, `to?`, `is` | [Conversion](./conversion.md) |
| Call-site marks | `inout`, `sink`, `!`, `!!`, `copy` | [Call-site marks](./call-site-marks.md) |
| Pipe | `\|>` | [Pipe](./pipe.md) |

## Precedence

From loosest to tightest binding:

| Level | Operators | Notes |
| --- | --- | --- |
| Assignment | `=` `+=` `-=` `*=` `/=` `%=` `&=` `\|=` `^=` `<<=` `>>=` `+%=` `-%=` `*%=` `??=` | Right associative. |
| Conditional | `a ? b : c` | Right associative. |
| 1 | `\|>` | Pipe. |
| 2 | `??` | Fallback for an empty option. |
| 3 | `\|\|` | Logical or. |
| 4 | `&&` | Logical and. |
| 5 | `==` `!=` `<` `>` `<=` `>=` `is` `in` | Comparison and tests. |
| 6 | `..` `..=` | Ranges. |
| 7 | `to` `to?` | Conversion. |
| 8 | `\|` | Bitwise or. |
| 9 | `^` | Bitwise exclusive or. |
| 10 | `&` | Bitwise and. |
| 11 | `<<` `>>` | Shifts. |
| 12 | `+` `-` `+%` `-%` | Addition and subtraction. |
| 13 | `*` `/` `%` `*%` | Multiplication, division, remainder. |
| Unary | `-` `!` `~` `copy` | Prefix. |
| Power | `**` | Binds tighter than unary minus, right associative. |
| Postfix | `.` `?.` `(...)` `[...]` `?` `!` `!!` `++` `--` | Field, call, index and the marks on the call-site page. |

Operators on the same level group from the left, so `10 - 4 - 3` is `(10 - 4) - 3`. The bitwise operators bind tighter than comparison, which avoids a classic C trap:

```pelago
fn main() {
    print(1 + 2 * 3, (1 + 2) * 3)
    print(7 & 3 == 3)
    print(10 - 4 - 3)
    print(1 << 2 + 1)
}
```

```text
7 9
true
3
8
```

The second line is `(7 & 3) == 3`, which is true. The last is `1 << (2 + 1)`, because `+` binds tighter than `<<`.
