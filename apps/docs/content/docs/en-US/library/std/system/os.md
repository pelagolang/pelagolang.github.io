---
title: std.os
description: "The process: arguments and exit status."
---

```text
import std.os
```

**This module is small on purpose for now.** `std.os` has one function, `os.exit`. The arguments come from the `main` parameter, not from a function. These are not available yet:

- `os.args()` as a function, the process id, the current directory and changing it, the home and temporary directories, the executable path and the host name.
- Platform constants such as the operating system, the architecture, the path separator and the line ending.
- Signals, `abort`, exit-code constants and a typed OS error.
- Running other programs (`std.process`: spawn, pipes, wait, kill).

Environment variables are in [std.env](./env.md) and are a read-only snapshot taken at start-up.

| Item | Notes |
| --- | --- |
| `main(args: [string])` | `main` may declare a list of strings as its parameter. The first element is the program name. Works in the interpreter and on Linux, Windows and macOS builds. |
| `os.exit(code)` | End the program at once with this status. Standard output is flushed, but `deinit` does not run. |

```pelago exit
import std.os

fn main(args: [string]) {
    if args.len() < 2 {
        print("usage: greet <name>")
        os.exit(2)
    }
    print("hello, #(args[1])")
}
```

```text
usage: greet <name>
```

`os.exit` has the type `never`, so the compiler knows the code after it is not reached. Use the exit status to tell scripts whether your tool succeeded: 0 for success and non-zero for failure.
