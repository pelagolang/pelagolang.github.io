---
title: Semantics
description: "What programs mean: values, evaluation, faults, cleanup and exhaustiveness."
---

| Topic | Page |
| --- | --- |
| Ownership, moves, references and access modes | [Values and access modes](./values.md) |
| The order operands run in | [Evaluation order](./evaluation.md) |
| What stops a program | [Faults](./faults.md) |
| When values are released | [Cleanup](./cleanup.md) |
| Covering every case of a `switch` | [Exhaustiveness](./exhaustiveness.md) |

Tasks add two rules. A task owns what its closure takes with `sink`, and two tasks in one `scope` may not both capture a variable if either changes it. A channel's `recv` returns `none` once every sender has gone. See [Concurrency](../../guide/concurrency/index.md).
