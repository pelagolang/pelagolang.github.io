---
title: Packages from Islet
description: "Importing installed dependencies by package name, major versions in the path, and how pelago finds them."
---

A dependency installed by [Islet](../../tools/islet.md) is imported by the package's name: `import json.decode` reads the module `decode` of the package `json`. A second major version is a module of the first: `import json.v2.decode`.

`pelago` finds installed packages in `deps/map.yaml`, which `islet install` writes, and refuses to build when `deps/` is out of date with `islet.lock`. Each package has its own import table, so two packages can use different versions of a third.

## Related

- [Import paths](./paths.md), [Islet](../../tools/islet.md)
