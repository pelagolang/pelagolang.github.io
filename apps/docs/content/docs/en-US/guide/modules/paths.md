---
title: Import paths
description: "How an import path is resolved: packages such as std, modules of your own package, relative paths with . and .., and folders as module groups."
---

| Path | Meaning |
| --- | --- |
| `std.os` | The first part is a package, here the standard library. |
| `geometry.shapes` | The first part names a top-level module of your own package. |
| `.sibling` | A leading dot is relative to the current file's folder. |
| `..util.strings` | `..` goes up one folder. |

A folder groups modules: `shapes/circle.pel` is `shapes.circle`, and `deep/x/m.pel` is `deep.x.m`. The imported module is bound under its **last** name: `import shapes.circle` gives `circle`.

`deep/x/m.pel`:

```text
import ..helper

pub fn g() -> int = helper.h()
```

`deep/helper.pel`:

```text
pub fn h() -> int = 7
```

`shapes/circle.pel`:

```text
pub fn area(r: int) -> int = 3 * r * r
```

`main.pel`:

```text
import deep.x.m
import .shapes.circle
import c = shapes.circle

fn main() {
    print(m.g(), circle.area(2), c.area(1))
}
```

`pelago run .` prints:

```text
7 12 3
```

`.shapes.circle` starts from the importing file's folder; `..helper` in `deep/x/m.pel` goes up to `deep/` and finds `helper.pel`; `import c = shapes.circle` renames the binding.

## Missing modules

`main.pel`:

```text
import nothere

fn main() {}
```

`pelago run .` stops with:

```text
main:1:8: error: there is no module or package `nothere`
```

## Related

- [Imports](./imports.md), [Packages](./packages.md), [The standard library](../../library/std/index.md)
