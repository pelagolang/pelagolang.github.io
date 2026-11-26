---
title: Language server
description: Editor features from pelago lsp.
---

`pelago lsp` is a language server built into the compiler. It speaks the Language Server Protocol over standard input and output, so any editor with a client can use it. The [VS Code and Zed extensions](../getting-started/editors.md) start it for you.

## Features

| Feature | What you get |
| --- | --- |
| Diagnostics | Errors and warnings from every compiler stage as you type, cleared as soon as they are fixed. Syntax errors in the open file show at once. |
| Quick fixes | "Did you mean" suggestions for a misspelt name, and a hint with a quick fix for an unused import. |
| Hover | A function's signature, the shape of a type, the type of an expression, and the types of a struct's fields. |
| Go to definition | Works across the files of a package. It also works for library names and modules: the library source opens as a read-only copy written to a temporary folder. A few built-in functions have no source, and for those nothing opens. |
| Find references | Every use of a name in the package. |
| Rename | Renames a name and all its uses; the library and built-ins cannot be renamed. |
| Completion | Keywords, declarations and locals. After a dot on a list, a string or a number it lists only the methods of that type. |
| Signature help | The parameters of a call, including calls written with `!` or `!!`, such as `xs.push!(4)`. |
| Outline | The functions and types of the current file. |
| Semantic colours | Highlighting that knows functions from methods and types from variables, and tags library methods as methods. Semantic highlighting is off by default in VS Code. |
| Formatting | The same layout as [`pelago fmt`](./formatter.md). |

## When it checks

Checking is debounced: the server checks the whole package 200 ms after the last edit. Syntax errors in the open file show at once, without waiting for that pause.

## Limits

The check is not incremental: each time it runs it looks at the whole package. Measured on synthetic packages, it takes about 0.16 s at 500 files and about 2 s at 5000 files after typing stops. That is fast for small and medium projects.

## Using it from another editor

Start `pelago lsp` as the server for `.pel` files with no arguments. If your editor cannot find `pelago`, give it the full path to the executable.
