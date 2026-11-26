---
title: Options and chaining
description: "?? ??= ?. and ?: working with values that may be none."
---

| Operator | Meaning |
| --- | --- |
| `a ?? b` | `a` if present, otherwise `b`. |
| `a ??= b` | Assign `b` to `a` when `a` is empty. |
| `a?.b` | Field or method of `a` when present, otherwise empty. |
| `e?` | Unwrap a result or option, or return the failure from the function. |

```pelago
fn find(xs: list<int>, n: int) -> int? {
    for x in xs { if x == n { return x } }
    none
}

fn main() {
    print(find([1, 2], 2) ?? 0, find([1, 2], 9) ?? 0)
    var v: int? = none
    v ??= 4
    v ??= 5
    print(v)
}
```

```text
2 0
some(4)
```

## Related

- [option](../../library/core/options/option.md)
- [Error handling](../../guide/errors.md)
