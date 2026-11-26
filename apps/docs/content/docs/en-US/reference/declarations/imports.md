---
title: Imports
description: "Grammar of import and pub import."
---

```text
import path
import alias = path
import { name, name: alias, ... } = path
pub import { name } = path
```

`import path` makes the module's items available behind its last path segment. The alias form renames it. The braces form brings single names in directly, with `name: alias` to rename one. `pub import` also re-exports the names to modules that import this one.

Each form has a full page in the guide:

- [Imports](../../guide/modules/imports.md)
- [Paths](../../guide/modules/paths.md)
- [Re-exporting](../../guide/modules/reexport.md)
