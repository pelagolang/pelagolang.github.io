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

## Not finished

`@derive(hash)` on an `obj` is accepted but not lowered yet (``not lowered yet: hashing this type``). Hashing a `float` key is not meaningful because of NaN.

## Related

[Interfaces](./index.md), [`eq`](./eq.md), [`std.hash`](../../std/hashes/hash.md) and [`std.fasthash`](../../std/hashes/fasthash.md) for hash functions over bytes
