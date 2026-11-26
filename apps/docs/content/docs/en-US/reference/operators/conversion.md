---
title: Conversion and tests
description: "to, to? and is: conversions that cannot lose information, checked downcasts and pattern tests."
---

`x to float` converts when nothing can be lost:

```pelago
fn main() {
    const n: int = 3
    print(n to float)
}
```

```text
3
```

A conversion that can lose information is refused. It has a named method instead (`truncInt`, `toByteChecked`, `wrapToByte`):

```pelago error
fn main() {
    print(2.9 to int)
}
```

```text

main:2:11: error: cannot convert `{float}` to `int` with `to`; this can lose information, so `to` does not allow it
```

`x to? T` returns an option for a checked downcast. `v is pattern` tests a value against a pattern and binds names for the code it guards; see [is](../../guide/switch/is.md).
