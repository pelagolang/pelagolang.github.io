---
title: The prelude
description: "What is in scope in every module without an import: the built-in types, ok, err, none, print, assert, panic, and methods."
---

The prelude is what every module sees without an import: the built-in types (`int`, `float`, `string`, `option`, `result` and so on), `ok`, `err`, `none`, `print`, `assert`, `panic` and a few more. Everything else comes from an import.

Methods belong to their type and arrive with it; you do not import them separately. `xs.push!(1)` needs no import, and neither does `x.sqrt()`.

`math` is also always in scope; see [Math](../../library/core/math/index.md).

## Standard library modules are not in the prelude

`os`, `io`, `fs`, `time`, `json` and the rest must be imported (`import std.os`). See the [library index](../../library/std/index.md).

## Related

- [Imports](./imports.md), [Core library](../../library/core/index.md)
