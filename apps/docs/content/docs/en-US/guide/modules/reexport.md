---
title: Re-exporting with pub import
description: "pub import: importing names and passing them on, to give a package one front door."
---

`pub import` imports names and makes them public from the importing module, so a module can gather names from several places and offer them from one.

`shapes/circle.pel`:

```text
pub fn area(r: int) -> int = 3 * r * r
```

`util.pel`:

```text
pub import { area } = .shapes.circle
```

`main.pel`:

```text
import { area } = util

fn main() {
    print(area(2))
}
```

`pelago run .` prints:

```text
12
```

`main` imported `area` from `util`, which got it from `shapes.circle`; `main` never mentions the inner module. Use this to keep a folder's layout private while exposing a stable set of names.

## Related

- [Imports](./imports.md), [Visibility](./visibility.md)
