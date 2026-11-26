---
title: Type declarations
description: "Grammar of struct, enum, interface, impl and obj declarations."
---

```text
struct name<T> { fields, methods, init, deinit }
enum name { case, case(field: type) }
interface name { fn method(self) -> type }
impl interface_name for type { methods }
open obj base { fields, open fn method(self) -> type }
obj derived : base { override fn method(self) -> type }
```

- Fields are `name: type` with an optional `= default`.
- A method's first parameter is `self`, `inout self` or `sink self`.
- `init` runs when a value is built by calling the type, and `deinit` runs when the value goes out of scope.
- `open` allows an `obj` to be extended or a method to be overridden, and `:` names the base.
- `abstract` and `final` are parsed but not enforced yet, and `super` is not an expression.

Each form has a full page in the guide:

- [struct](../../guide/types/struct.md)
- [enum](../../guide/types/enum.md)
- [obj](../../guide/types/obj.md)
- [interface](../../guide/types/interface.md)
- [generics](../../guide/types/generics.md)
- [aliases](../../guide/types/aliases.md)
