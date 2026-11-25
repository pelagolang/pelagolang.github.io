# Docs rewrite plan

Dennis's brief (2026-11-25): the docs are too shallow. Features and types are summarised and several are crammed onto one page. The target is the depth of the Rust standard library documentation: one page for every primitive, type, std module and **language feature**, each with a description, every method with its signature and behaviour, examples that compile, edge cases and traps, related items, and platform notes. The std and core indexes need a "How to read this documentation" section.

## Audit (2026-11-25)

Pages that are too thin or merge several subjects:

| Page | Problem | Target |
| --- | --- | --- |
| `library/core/numbers.md` | int and float on one page | Done in PR 1: `primitives/int.md`, `primitives/float.md` |
| `library/core/wide-integers.md` | four types on one page | one page each: `int128`, `uint128`, `int256`, `uint256` |
| `library/core/wide-floats.md` | four formats on one page | one page each: `float16`, `float32`, `float128`, `float256` |
| (none) | `int8`..`uint64`, `uint`, `byte` have no page | one page each |
| `library/core/lists.md` | list, slices and iterators together | `list`, `iter` (one page per adapter group), `slice` |
| `library/core/maps-and-sets.md` | map and set together | `map`, `set` |
| `library/core/strings.md` | string and str together; parsing and formatting inside | `string`, `str`, `chars`, parsing |
| `library/core/options-and-results.md` | two types, `?`, `??` together | `option`, `result`, `?` and `??` |
| `library/core/math.md` | the whole namespace on one page | one page per group (rounding, powers, gcd, float checks) |
| `reference/types.md` | every built-in type in a table | table stays; each row links to its page |
| `reference/operators.md` | all operators on one page | keep as the table; add a page per operator family |
| `guide/*.md` | each guide page covers 4 to 8 features | one page per feature, below |
| `tour/index.md`, `examples/index.md` | long single pages | keep as tours, link into feature pages |
| std pages with 30 to 60 lines | hashes, crypto, ciphers, random, system | add full signature tables, edge cases and platform notes |
| `library/core/index.md`, `library/std/index.md` | no "how to read", no prelude, no conventions | Done in PR 1 |

## Target tree

```
library/
  index.md                      How to read this documentation
  core/
    index.md
    primitives/                 bool, char, int, float (PR 1)
                                int8 int16 int32 int64 uint uint8 uint16 uint32 uint64
                                int128 uint128 int256 uint256
                                float32 float16 float128 float256
                                tuple, range, unit and never
    text/                       string, str, chars, parsing
    collections/                list, iter, map, set, braid, box
    results/                    option, result, ? and ??
    interfaces/                 show eq order hash clone converts operators
    tasks/                      tasks, channels, atomics
    memory/                     arena, pool, box
    math/                       one page per group
  std/                          ONE foldable sidebar entry; groups as today
    each module: purpose, types, functions with signatures, examples, errors, platform notes
guide/                          one page per feature
  variables (let const var), shadowing, functions, parameters and defaults,
  closures, access modes (let, inout, sink), copy, struct, enum, obj and inheritance,
  interface, impl, generics, bounds, type aliases, switch, patterns (value, range, list, struct, enum),
  is, options, results, ?, ??, errors without exceptions, modules and imports, visibility (pub, priv),
  tasks, channels, braids, comments, strings and interpolation, ranges, loops (for, while, step),
  meta, overflow and wrapping, conversions (to, to?)
reference/                      lexical, grammar, operators (a page per family), keywords (a page per keyword group)
```

## Order of PRs

1. Plan, "How to read", core index, std index, prelude and conventions, `bool`, `char`, `int`, `float`.
2. One page per integer width and per float width; split wide integers and floats.
3. Text: `string`, `str`, `chars`, parsing.
4. Collections: `list`, `iter`, `map`, `set`, `braid`, `box`.
5. `option`, `result`, `?`, `??`, interfaces.
6. Guide, split into one page per feature (several PRs).
7. Reference: operators and keywords, split.
8. std modules, group by group, to full reference depth.

Every Pelago block must compile and its output must match (`check-samples.mjs`); links point at `.md` or `.mdx` files (`check-links.mjs`); the sidebar matches `pelago std --json`.
