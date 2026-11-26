---
title: Declarations
description: What can appear at the top of a module and inside a body, with the grammar of each form.
---

A module is a list of declarations. Their **order does not matter**: a function can call one written below it, and a type can be used before its definition. Each declaration is private to its module unless it is marked `pub` (see [Visibility](../../guide/modules/visibility.md)).

| Form | Page |
| --- | --- |
| `const`, `var` | [Constants and variables](./constants-and-variables.md) |
| `fn`, parameters, results, `never` | [Functions](./functions.md) |
| `struct`, `enum`, `interface`, `impl`, `obj` | [Type declarations](./types.md) |
| `import`, `use`, `pub import` | [Imports](./imports.md) |

Attributes such as `@inline_always` go before a declaration; see [Attributes](../../guide/attributes/index.md).
