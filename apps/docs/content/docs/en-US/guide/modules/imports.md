---
title: Imports
description: "import and use: every form (module, renamed module, some names, one renamed name, everything), name clashes, own names winning, and cycles."
---

An import is a binding, written like the declarations around it. It goes at the top level of a file, not inside a function.

| Form | Effect |
| --- | --- |
| `import std.os` | The module, under its last name: `os.exit(1)`. |
| `import tools = std.os` | The module under another name: `tools.exit(1)`. |
| `import { exit } = std.os` | Some names, directly: `exit(1)`. |
| `import { exit: leave } = std.os` | One name, renamed. |
| `import { ... } = std.os` | Everything the module makes public. |
| `pub import { exit } = std.os` | Imports the names and re-exports them; see [Re-exporting](./reexport.md). |

`use` is another spelling of `import`.

`geometry.pel`:

```text
pub fn origin() -> int = 0
pub const scale: int = 3
```

`main.pel`:

```text
import geometry
import { origin: zero, scale } = geometry

fn main() {
    print(zero(), scale, geometry.scale)
}
```

`pelago run .` prints:

```text
0 3 3
```

## When two imports clash

Two imports may bring the same name. It is an error only when you use that name, and the message tells you how to choose:

`a.pel`:

```text
pub fn fa() -> int = 1
```

`b2.pel`:

```text
pub fn fa() -> int = 9
```

`main.pel`:

```text
import { fa } = a
import { fa } = b2

fn main() {
    print(fa())
}
```

`pelago run .` stops with:

```text
main:5:11: error: `fa` could be `main.a.fa` and `main.b2.fa`; write the module name in front to choose
```

Write `a.fa()` or rename one: `import { fa: fa2 } = b2`.

## Your own names win

A function declared in your module takes the place of an imported name with no error:

`a.pel`:

```text
pub fn fa() -> int = 1
```

`main.pel`:

```text
import { fa } = a

fn fa() -> int = 5

fn main() {
    print(fa())
}
```

`pelago run .` prints:

```text
5
```

## Cycles

Modules may import each other, so two files can call into one another:

`a.pel`:

```text
import b

pub fn fa() -> int = 1
pub fn useb() -> int = b.fb()
```

`b.pel`:

```text
import a

pub fn fb() -> int = 2
pub fn usea() -> int = a.fa()
```

`main.pel`:

```text
use a
use { ... } = b

fn main() {
    print(a.useb(), usea(), fb())
}
```

`pelago run .` prints:

```text
2 1 2
```

## Related

- [Import paths](./paths.md), [Visibility](./visibility.md), [Re-exporting](./reexport.md)
