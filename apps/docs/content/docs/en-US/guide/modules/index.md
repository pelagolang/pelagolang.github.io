---
title: Modules and imports
description: "How files become modules: one page each on visibility with pub, import forms, import paths, re-exporting, the prelude and Islet packages."
---

Every `.pel` file is a module named after the file: `geometry.pel` is the module `geometry`. A folder of files groups modules, so `shapes/circle.pel` is `shapes.circle`. Run a folder to build all of its files together:

```sh
pelago run .
```

(`pelago run main.pel` on a single file sees only that file; give it the folder so sibling modules are found.)

| Topic | What it covers | Page |
| --- | --- | --- |
| `pub`, `priv` | What other modules may see: functions, constants, types, fields, methods. | [Visibility](./visibility.md) |
| `import`, `use` | The forms: whole module, renamed, some names, everything. | [Imports](./imports.md) |
| `.sibling`, `..up`, `std.os` | How a path finds a module. | [Import paths](./paths.md) |
| `pub import` | Passing names on to your own importers. | [Re-exporting](./reexport.md) |
| Prelude | What is in scope without an import. | [The prelude](./prelude.md) |
| Islet | Dependencies by package name. | [Packages](./packages.md) |

## Rules at a glance

- Names are private to their module unless marked `pub`.
- The order of declarations inside a module does not matter.
- Modules may import each other; cycles are allowed.
- A name declared in a module wins over one it imports.
- Two imports that bring the same name are an error only when you use the name; write the module name in front to choose.

## The standard library

`core` is built in and always available: lists, maps, strings, numbers, results and options, tasks. `std` holds modules you import when needed: `std.io`, `std.fs`, `std.path`, `std.time`, `std.env`, `std.os`, `std.json`, `std.regex` and `std.big`. See the [library](../../library/std/index.md).

## Related

- [Functions](../functions.md), [Types](../types/index.md), [Islet](../../tools/islet.md)
