---
title: hash
description: "The hash interface: what a map key or set member needs, and how to implement it."
---

```
pub interface hash : eq {
    fn hash(self) -> int
}
```

A type used as a [`map`](../collections/map.md) key or a [`set`](../collections/set.md) member needs `hash` and `eq`, and equal values must give the same hash. Integers, `char`, `string`, `bool` and plain structs and enums already have it. For an `obj`, write both:

```pelago
obj key { id: int }

impl eq for key {
    fn eq(self, other: key) -> bool = self.id == other.id
}

impl hash for key {
    fn hash(self) -> int = self.id
}

fn main() {
    var m: map<key, string> = map {}
    m.insert!(key { id: 1 }, "one")
    print(m.get(key { id: 1 }), m.len())
}
```

```text
some("one") 1
```

`@derive(eq, hash)` on an `obj` writes both for you, and the `obj` works as a `map` key or `set` member.  key is not meaningful because of NaN.

```pelago
@derive(eq, hash)
obj point {
    x: int
    y: int
}

fn main() {
    var seen: set<point> = set {}
    seen.insert!(point { x: 1, y: 2 })
    print(seen.contains(point { x: 1, y: 2 }), seen.contains(point { x: 2, y: 1 }), seen.len())
}
```

```text
true false 1
```

Hashing a `float` key is not meaningful because of NaN.

## Calling it as a method

`v.hash()` gives the hash of any value whose type provides `hash`: numbers, text, lists, derived structs and `obj`s, and values of a type `T: hash`. Equal values give equal hashes. The number itself is not specified, so compare hashes with each other and never store them or print them as data.

```pelago
@derive(eq, hash)
obj point {
    x: int
    y: int
}

fn digest<T: hash>(v: T) -> int = v.hash()

fn main() {
    const a = point { x: 1, y: 2 }
    const b = point { x: 1, y: 2 }
    print(a.hash() == b.hash(), digest("a") == digest("a"), digest(5) == digest(6))
}
```

```text
true true false
```

## Related

[Interfaces](./index.md), [`eq`](./eq.md), [`std.hash`](../../std/hashes/hash.md) and [`std.fasthash`](../../std/hashes/fasthash.md) for hash functions over bytes
