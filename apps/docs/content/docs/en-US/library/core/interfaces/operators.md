---
title: Operator interfaces
description: "add, sub, mul, div, rem and neg: giving your own type the arithmetic operators."
---

```
pub interface add { fn add(self, other: Self) -> Self }
pub interface sub { fn sub(self, other: Self) -> Self }
pub interface mul { fn mul(self, other: Self) -> Self }
pub interface div { fn div(self, other: Self) -> Self }
pub interface rem { fn rem(self, other: Self) -> Self }
pub interface neg { fn neg(self) -> Self }
```

Each operator is backed by one interface: `+` by `add`, `-` by `sub`, `*` by `mul`, `/` by `div`, `%` by `rem` and unary `-` by `neg`. Implement the interface and the operator works on your type, with the `op=` form (`c += b`) too.

```pelago
struct v { n: int }

impl add for v {
    fn add(self, o: v) -> v = v { n: self.n + o.n }
}
impl sub for v {
    fn sub(self, o: v) -> v = v { n: self.n - o.n }
}
impl mul for v {
    fn mul(self, o: v) -> v = v { n: self.n * o.n }
}
impl div for v {
    fn div(self, o: v) -> v = v { n: self.n / o.n }
}
impl rem for v {
    fn rem(self, o: v) -> v = v { n: self.n % o.n }
}
impl neg for v {
    fn neg(self) -> v = v { n: 0 - self.n }
}

fn main() {
    const a = v { n: 7 }
    const b = v { n: 2 }
    print((a + b).n, (a - b).n, (a * b).n, (a / b).n, (a % b).n, (-a).n)
    var c = a
    c += b
    print(c.n)
}
```

```text
9 5 14 3 1 -7
9
```

The wrapping operators `+% -% *%`, the bit operators and `**` have no interface: they work on integers only.

## Related

[Interfaces](./index.md), [Operators](../../../reference/operators/index.md)
