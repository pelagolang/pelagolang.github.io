---
title: Text forms
description: "std.timefmt: RFC 3339, ISO 8601, RFC 2822, HTTP dates, durations and your own patterns, for formatting and parsing."
---

```text
import std.timefmt
```

`std.timefmt` turns dates and times into text and back. Everything that reads text returns `! time_error` and never stops the program. Parsing is strict: the whole text must be used, numbers have the widths the pattern gives, and the date must exist.

```pelago
import std.time
import std.calendar
import std.zone
import std.timefmt
import { time_error } = std.time

fn main() -> void ! time_error {
    const z = timefmt.parseRfc3339("2026-11-17T09:47:23.5+01:00")?
    print(z, z.moment())
    print(timefmt.formatZoned(z, "EEEE d MMMM yyyy, HH:mm xxx")?)
    const d = timefmt.parse("17/11/2026 9:05 PM", "dd/MM/yyyy h:mm a")?
    print(d)
    print(timefmt.parseDuration("PT1H30M")?, timefmt.formatDuration(time.minutes(90)))
}
```

```text
2026-11-17T09:47:23.5+01:00 1794905243.500000000
Tuesday 17 November 2026, 09:47 +01:00
2026-11-17T21:05:00
5400s PT1H30M
```

## Standard forms

| Function | Result | Notes |
| --- | --- | --- |
| `rfc3339(zoned)` | `string` | `2026-11-17T09:47:23+01:00`, `Z` for UTC, with the fraction when there is one. |
| `rfc2822(zoned)` | `string` | Mail form: `Tue, 17 Nov 2026 09:47:23 +0100`. |
| `httpDate(moment)` | `string` | HTTP header form, always GMT: `Tue, 17 Nov 2026 09:47:23 GMT`. |
| `formatDuration(d)` | `string` | ISO 8601 with days, hours, minutes and seconds: `PT1H30M`, `P1DT12H`, `PT0.5S`, `-PT5S`. |
| `parseRfc3339(text)` | `zoned ! time_error` | Needs an offset; `t`, `z` and a space for `T` are accepted, and a fraction has one to nine digits. |
| `parseRfc2822(text)` | `zoned ! time_error` | The weekday is optional and checked; `GMT` and `UT` mean +0000. |
| `parseHttpDate(text)` | `moment ! time_error` | |
| `parseDate(text)`, `parseTime(text)`, `parseDateTime(text)` | `date`, `time_of_day`, `date_time` | `2026-11-17`, `09:47:23.5`, `2026-11-17T09:47:23.5`. |
| `parseDuration(text)` | `duration ! time_error` | Years and months are an error: they are not a fixed length. |

```pelago
import std.time
import std.calendar
import std.zone
import std.timefmt
import { time_error } = std.time

fn main() -> void ! time_error {
    const paris = zone.named("Europe/Paris")?
    const z = paris.zoned(time.fromUnix(1700000000))
    print(timefmt.rfc3339(z))
    print(timefmt.rfc2822(z))
    print(timefmt.httpDate(time.fromUnix(1700000000)))
    print(timefmt.formatZoned(z, "yyyy-MM-dd HH:mm:ss z VV")?)
    print(timefmt.format(z.dateTime(), "MMM d, yyyy 'at' h:mm a")?)
    print(timefmt.formatDuration(time.hours(36)), timefmt.formatDuration(time.millis(500)))
    print(timefmt.parseRfc2822("Tue, 17 Nov 2026 09:47:23 +0100")?)
    print(timefmt.parseHttpDate("Tue, 17 Nov 2026 09:47:23 GMT")?)
    print(timefmt.parseDate("2026-02-30").isErr(), timefmt.parse("2026-13-01", "yyyy-MM-dd").isErr())
    print(timefmt.parseDuration("P1M").isErr())
}
```

```text
2023-11-14T23:13:20+01:00
Tue, 14 Nov 2023 23:13:20 +0100
Tue, 14 Nov 2023 22:13:20 GMT
2023-11-14 23:13:20 CET Europe/Paris
Nov 14, 2023 at 11:13 PM
P1DT12H PT0.5S
2026-11-17T09:47:23+01:00
1794908843.000000000
true true
true
```

## Patterns

`format`, `formatZoned`, `parse` and `parseZoned` take a pattern. The letters read like what they print, and the same letters format and parse, in the style of Unicode's date patterns.

| Letters | Meaning | Example |
| --- | --- | --- |
| `yyyy` `yy` | Year, four digits or two | `2026` `26` |
| `M` `MM` `MMM` `MMMM` | Month: number, two digits, short name, long name | `3` `03` `Mar` `March` |
| `d` `dd` | Day of the month | `7` `07` |
| `EEE` `EEEE` | Weekday name, short or long (checked when parsing) | `Tue` `Tuesday` |
| `H` `HH`, `h` `hh` | Hour 0 to 23, hour 1 to 12 | `9` `09` |
| `a` | `AM` or `PM`, with `h` | `PM` |
| `m` `mm`, `s` `ss` | Minute, second | `05` |
| `S` to `SSSSSSSSS` | Fraction of a second, that many digits | `500` |
| `x` `xx` `xxx` | Offset `+01`, `+0100`, `+01:00` | `+01:00` |
| `X` `XX` `XXX` | The same, `Z` for zero | `Z` |
| `z`, `VV` | Zone abbreviation, zone name (formatting only) | `CET`, `Europe/Paris` |

Text between single quotes is literal (`'at'`; `''` is a quote), and any other character that is not a letter is literal. A letter that is not in the table is a `time_error`. Names are English only.

| Function | Result | Notes |
| --- | --- | --- |
| `format(date_time, pattern)` | `string ! time_error` | No zone, so `x`, `X`, `z` and `VV` are errors. |
| `formatZoned(zoned, pattern)` | `string ! time_error` | |
| `parse(text, pattern)` | `date_time ! time_error` | A pattern with no offset letter. |
| `parseZoned(text, pattern)` | `zoned ! time_error` | The pattern must have `x` or `X`; the zone is that fixed offset. |

Zones come from [std.zone](./zone.md) and dates from [std.calendar](./calendar.md).
