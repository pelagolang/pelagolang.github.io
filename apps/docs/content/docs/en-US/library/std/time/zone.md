---
title: Zones
description: "std.zone: IANA time zones, fixed offsets and POSIX rules, with the offset in force at any moment and ambiguous or missing local times handled as values."
---

```text
import std.zone
```

`std.zone` puts a [`moment`](./time.md) on a wall clock. A `time_zone` is a plain value you can keep and copy: a database zone such as `Europe/Paris`, a fixed offset such as `+05:30`, or a rule written as a POSIX `TZ` string. `zone.named` and the other constructors return `! time_error` when the name or text is not valid.

```pelago
import std.time
import std.calendar
import std.zone
import { time_error } = std.time

fn main() -> void ! time_error {
    const paris = zone.named("Europe/Paris")?
    const z = paris.zoned(time.fromUnix(1700000000))
    print(z, z.abbreviation(), z.offsetSeconds(), z.isDst())
    const summer = paris.zoned(time.fromUnix(1750000000))
    print(summer, summer.abbreviation(), summer.isDst())
    print(z.dateTime(), z.moment())
    const tokyo = zone.named("Asia/Tokyo")?
    print(tokyo.zoned(time.fromUnix(1700000000)))
    print(zone.utc().zoned(time.fromUnix(0)), (zone.fixed(19800)?).zoned(time.fromUnix(0)))
}
```

```text
2023-11-14T23:13:20+01:00 CET 3600 false
2025-06-15T17:06:40+02:00 CEST true
2023-11-14T23:13:20 1700000000.000000000
2023-11-15T07:13:20+09:00
1970-01-01T00:00:00Z 1970-01-01T05:30:00+05:30
```

A `zoned` is a moment seen in a zone: it has the `moment()`, the `offsetSeconds()` (east of UTC), the `abbreviation()` (`CET`, `CEST`), `isDst()`, the wall-clock `dateTime()` and the `zone()`. It prints as RFC 3339 with the offset (`Z` for UTC itself). `zoned` values compare by the moment.

## Making a zone

| Function | Result | Notes |
| --- | --- | --- |
| `zone.named(name)` | `time_zone ! time_error` | A database zone (`Europe/Paris`, `America/New_York`, `UTC`). Reads the system's files, and the bundled copy when the system has none. |
| `zone.bundled(name)` | `time_zone ! time_error` | The same, always from the copy bundled in [`std.tzdata`](./tzdata.md), so every machine gives the same answer. |
| `zone.local()` | `time_zone` | The system's zone: `TZ` (a name or a POSIX rule), then `/etc/localtime`, else UTC. |
| `zone.utc()` | `time_zone` | UTC itself. |
| `zone.fixed(seconds)` | `time_zone ! time_error` | A constant offset, -86399 to 86399, named like `+02:00`. |
| `zone.parseRule(text)` | `time_zone ! time_error` | A POSIX `TZ` string such as `CET-1CEST,M3.5.0,M10.5.0/3`. |

Database zones read TZif files (RFC 8536, versions 1 to 4: the transition list and the rule that carries on after the last transition) from `$TZDIR` or the usual directories such as `/usr/share/zoneinfo`. Names are checked, so a name cannot reach outside the directory.

## Using a zone

| Method | Result | Notes |
| --- | --- | --- |
| `name()` | `string` | `Europe/Paris`, `UTC`, `+02:00`. |
| `infoAt(moment)` | `zone_info` | `.offset`, `.abbreviation` and `.isDst` in force at the moment. |
| `zoned(moment)` | `zoned` | The moment seen in this zone. |
| `resolve(date_time)` | `local_result` | Which moments a wall-clock time is. See below. |

On a `zoned`, `plus(d)` adds exact time (a day is 24 hours), while `plusDays(n)` and `plusMonths(n)` keep the wall-clock time, so the offset can change on the way:

```pelago
import std.time
import std.calendar
import std.zone
import { time_error } = std.time

fn main() -> void ! time_error {
    const ny = zone.named("America/New_York")?
    const before = ny.zoned(time.fromUnix(1772902800))
    print(before)
    print(before.plusDays(1))
    print(before.plus(time.days(1)))
    print((zone.parseRule("CET-1CEST,M3.5.0,M10.5.0/3")?).zoned(time.fromUnix(1750000000)))
    print(zone.named("Mars/Olympus").isErr(), (zone.bundled("Asia/Kolkata")?).zoned(time.fromUnix(0)))
}
```

```text
2026-03-07T12:00:00-05:00
2026-03-08T12:00:00-04:00
2026-03-08T13:00:00-04:00
2025-06-15T17:06:40+02:00
true 1970-01-01T05:30:00+05:30
```

Both are right; they answer different questions. `plusDays(1)` is "the same time tomorrow" and `plus(time.days(1))` is "24 hours later", which is an hour later on the clock when the clocks went forward in between.

## Times that are missing or happen twice

When the clocks jump forward a local time does not exist, and when they go back it happens twice. `resolve` does not guess: it returns a `local_result` and you choose.

| `kind` | Meaning |
| --- | --- |
| `one` | The ordinary case: one moment. |
| `twice` | The clocks went back; the time happens at two moments. |
| `never` | The clocks jumped forward; there is no such time. |

`earliest()` is the first moment the time happens (the daylight-time reading when it happens twice) and `latest()` the last, and both are `none` in a gap. `forward()` always gives a moment: the one reading, the first of two, or, in a gap, the time read with the offset before the gap, so `02:30` in a spring-forward gap becomes `03:30`.

```pelago
import std.time
import std.calendar
import std.zone
import { time_error } = std.time

fn main() -> void ! time_error {
    const paris = zone.named("Europe/Paris")?
    const gap = calendar.dateTimeOf(calendar.dateOf(2026, 3, 29)?, calendar.timeOf(2, 30, 0, 0)?)
    const r = paris.resolve(gap)
    print(r.kind, r.earliest() == none, paris.zoned(r.forward()))
    const twice = calendar.dateTimeOf(calendar.dateOf(2026, 10, 25)?, calendar.timeOf(2, 30, 0, 0)?)
    const t = paris.resolve(twice)
    print(t.kind, paris.zoned(t.earliest() ?? time.fromUnix(0)), paris.zoned(t.latest() ?? time.fromUnix(0)))
    const plain = paris.resolve(calendar.dateTimeOf(calendar.dateOf(2026, 11, 17)?, calendar.timeOf(9, 0, 0, 0)?))
    print(plain.kind, paris.zoned(plain.forward()))
}
```

```text
never true 2026-03-29T03:30:00+02:00
twice 2026-10-25T02:30:00+02:00 2026-10-25T02:30:00+01:00
one 2026-11-17T09:00:00+01:00
```

A day has 86400 seconds; there are no leap seconds.
