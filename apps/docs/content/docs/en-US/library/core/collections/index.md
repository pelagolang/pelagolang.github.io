---
title: Collections
description: "list, iter, map and set: growable and keyed containers, and the lazy sequences that walk them."
---

| Type | What it holds | Page |
| --- | --- | --- |
| `list<T>`, written `[T]` | A growable sequence, indexed from 0. | [list](./list.md) |
| `[T; N]` | A fixed-size sequence stored inline; the size is part of the type. | [array](./array.md) |
| `xs[a..b]` | A temporary window onto part of a list, array or text. | [slices](./slice.md) |
| `iter<T>` | A lazy sequence: the result of `map`, `filter`, `split`, `chars` and the like. | [iter](./iter.md) |
| `map<K, V>` | Keys with values, in insertion order. | [map](./map.md) |
| `set<T>` | Unique values, in insertion order. | [set](./set.md) |

Other containers have their own pages: [braids](../../../guide/braids.mdx) (a fixed-size run with alternating types) and, in the guide, boxes.

## Rules every collection shares

- **Value semantics.** Assigning a collection moves it. `copy xs` makes an independent second value. Passing one to a function that changes it needs `inout`.
- **Changing methods end in `!`.** `xs.push!(1)` changes `xs`, so `xs` must be a `var`. Methods that return a new collection leave the receiver alone (`sorted`, `reversed`).
- **Out-of-range access stops the program.** `xs[9]` is `stopped: index out of range`, `m["missing"]` is `key not found`. The method forms `get` return an option instead.
- **Equality is by value.** `[1, 2] == [1, 2]` is `true`. Map and set equality ignore order.
- **Printing** works for any collection whose elements print: `[1, 2]`, `{"a": 1}`, `{1, 2}`, and `{:}` for an empty map.
