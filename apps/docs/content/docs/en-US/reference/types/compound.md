---
title: Compound types
description: "Tuples, braids, lists, arrays, windows, maps, sets, ranges and boxes: how each is written."
---

| Type | Example | Meaning |
| --- | --- | --- |
| Tuple | `(int, string)` | A fixed group of values; fields are `t.0`, `t.1`. |
| Braid | `(int, string; 4)` | A fixed-size run whose types repeat in a cycle. See [Braids](../../guide/braids.mdx). |
| List | `[int]` or `list<int>` | A growable sequence. See [list](../../library/core/collections/list.md). |
| Array | `[int; 4]` | Exactly `N` values stored inline. See [array](../../library/core/collections/array.md). |
| Window | `[int..]` or `slice<int>` | A borrowed part of a list or array; a parameter type only. It cannot grow, be stored or be returned. See [slice](../../library/core/collections/slice.md). |
| Map | `map<string, int>` | Keys with values. See [map](../../library/core/collections/map.md). |
| Set | `set<int>` | Unique values. See [set](../../library/core/collections/set.md). |
| Range | `0..10` | A span of integers. See [Ranges](../operators/ranges.md). |
| Box | `box<tree>` | A value stored on the heap. See [box](../../guide/ownership/box.md). |

```pelago
fn main() {
    const t = (1, "two", 3.0)
    print(t.0, t.1, t.2)
    const arr: [int; 3] = [1, 2, 3]
    const m: map<string, int> = map { "a": 1 }
    const s: set<int> = set { 1, 2 }
    print(arr, m, s.len())
}
```

```text
1 two 3
[1, 2, 3] {"a": 1} 2
```

## Related

- [Tuples](../../guide/types/tuples.md)
- [Collections guide](../../guide/collections.md)
