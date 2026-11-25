---
title: map
description: "map<K, V>: keys with values in insertion order: literals, lookup, every method, ordering and what stops the program."
---

`map<K, V>` stores values under keys. Keys must support equality and hashing (`eq` and `hash`), so `int`, `string`, `char`, `bool` and plain structs and enums work. Iteration follows **insertion order**: removing a key and inserting it again moves it to the end.

## Writing a value

`map { "a": 1, "b": 2 }` is a literal; `map {}` an empty one, typed from context: `const m: map<string, int> = map {}`.

## Lookup

| Form | Result | Behaviour |
| --- | --- | --- |
| `m[k]` | `V` | The value. A missing key stops with `key not found`. |
| `m.get(k)` | `V?` | The value, or `none`. |
| `m.containsKey(k)` | `bool` | |
| `m.len()`, `m.isEmpty()` | | |

`m[k] = v` does **not** add a key: assigning to a missing key stops with `key not found`. Use `insert!`.

## Changing a map

| Method | Result | Behaviour |
| --- | --- | --- |
| `insert!(k, v)` | `V?` | Add the key, or replace its value. Returns the previous value. A replaced key keeps its place; a new key goes to the end. |
| `remove!(k)` | `V?` | Remove the key; returns its value, or `none` when it was absent. |
| `clear!()` | | Remove everything. |

When the key or value is a variable rather than a literal, hand it over with `sink`: `m.insert!(sink name, 5)`. Use `copy name` if you still need it afterwards.

```pelago
fn main() {
    var stock: map<string, int> = map { "apples": 3 }
    stock.insert!("pears", 5)
    const old = stock.insert!("apples", 4)
    print(old, stock.get("apples"), stock.get("figs"))
    print(stock.remove!("pears"), stock.remove!("pears"), stock.len())
    stock.insert!("kiwis", 1)
    stock.remove!("apples")
    stock.insert!("apples", 9)
    print(stock)
}
```

```text
some(3) some(4) none
some(5) none 1
{"kiwis": 1, "apples": 9}
```

## Walking a map

`keys()` and `values()` return iterators in insertion order. `for (k, v) of m` visits each pair.

```pelago
fn main() {
    const m: map<string, int> = map { "b": 2, "a": 1 }
    for (k, v) of m {
        print("#k=#v")
    }
    print(m.keys().toList(), m.values().toList(), m.values().sum())
}
```

```text
b=2
a=1
["b", "a"] [2, 1] 3
```

## Equality

Two maps are equal when they have the same keys with equal values, **regardless of order**.

```pelago
fn main() {
    const a: map<string, int> = map { "a": 1, "b": 2 }
    const b: map<string, int> = map { "b": 2, "a": 1 }
    const e: map<int, int> = map {}
    print(a == b, e, e.isEmpty())
}
```

```text
true {:} true
```

## Edge cases

- Missing key: `m[k]` stops, `get` gives `none`.
- `m[k] = v` on a missing key stops; it is not an insert.

## Related

[`set`](./set.md), [`list`](./list.md), [`iter`](./iter.md), [Collections guide](../../../guide/collections.md)
