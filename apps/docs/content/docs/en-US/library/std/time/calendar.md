---
title: Calendar
description: "std.calendar: dates, times of day and date-times with no zone, weekdays, ISO weeks and month arithmetic."
---

`std.calendar` is the wall calendar: a `date`, a `time_of_day` and a `date_time` as people say them, with no time zone. It uses the proleptic Gregorian calendar (today's rules, extended backwards and forwards), ISO 8601 weekdays (Monday is 1) and ISO week numbers. A day has 86400 seconds; there are no leap seconds.

```pelago
import std.calendar
import std.time
import { time_error } = std.time

fn main() -> void ! time_error {
    const d = calendar.dateOf(2026, 11, 17)?
    print(d, d.weekday(), d.ordinal(), d.plusMonths(3), d.plusDays(100))
    const t = calendar.timeOf(9, 47, 23, 0)?
    print(calendar.dateTimeOf(d, t))
}
```

```text
2026-11-17 Tuesday 321 2027-02-17 2027-02-25
2026-11-17T09:47:23
```

A `date` is made only by `calendar.dateOf` (which checks that the day exists), `calendar.fromDays` or `calendar.dateOrdinal`, so a value of the type is always a real day. Months are numbers 1 to 12. Functions that can be given bad parts return `! time_error`, so you write `?` or handle the error.

## Making and checking

| Function | Result | Notes |
| --- | --- | --- |
| `calendar.dateOf(year, month, day)` | `date ! time_error` | An error when the month is not 1 to 12 or the day is not in the month. |
| `calendar.dateOrdinal(year, n)` | `date ! time_error` | Day `n` of the year; 1 is 1 January. |
| `calendar.fromDays(n)` | `date` | `n` days after 1970-01-01 (before it when negative). |
| `calendar.timeOf(h, m, s, nanos)` | `time_of_day ! time_error` | A second of 60 is read as 59. |
| `calendar.dateTimeOf(date, time)` | `date_time` | |
| `calendar.fromMoment(m)` | `date_time` | The date and time of a `moment` on the UTC timeline. |
| `calendar.isLeap(year)`, `calendar.daysInMonth(year, month)` | `bool`, `int` | `daysInMonth` stops for a month outside 1 to 12. |

## Dates

| Method | Result | Notes |
| --- | --- | --- |
| `year()`, `month()`, `day()` | `int` | |
| `days()` | `int` | Days since 1970-01-01. |
| `ordinal()` | `int` | Day of the year. |
| `weekday()` | `weekday` | `monday` to `sunday`; `isoNumber()` is 1 to 7, `next()` and `prev()` step a day. |
| `isoWeek()` | `iso_week` | `.year` and `.week` (1 to 53). The week year can differ from the calendar year near New Year. |
| `plusDays(n)`, `plusMonths(n)`, `plusYears(n)` | `date` | Negative goes back. Months keep the day when they can and otherwise stop at the end of the month. |
| `since(other)` | `int` | Days after `other`. |
| `isLeapYear()`, `daysInMonth()` | | |

Dates compare with `==` and `<`, and print as `2026-11-17`.

```pelago
import std.calendar
import std.time
import { time_error } = std.time

fn main() -> void ! time_error {
    print(calendar.isLeap(2000), calendar.isLeap(1900), calendar.daysInMonth(2024, 2))
    print((calendar.dateOf(2024, 1, 31)?).plusMonths(1), (calendar.dateOf(2025, 1, 31)?).plusMonths(1))
    print((calendar.dateOf(2024, 2, 29)?).plusYears(1))
    const w = (calendar.dateOf(2026, 12, 31)?).isoWeek()
    print(w.year, w.week)
    print(calendar.dateOrdinal(2024, 366)?, calendar.fromDays(0))
    const a = calendar.dateOf(2026, 11, 17)?
    const b = calendar.dateOf(2026, 1, 1)?
    print(a.since(b), a > b, a.weekday().isoNumber(), a.weekday().next())
    switch calendar.dateOf(2026, 2, 30) {
        case ok(x): print(x)
        case err(e): print("error")
    }
}
```

```text
true false 29
2024-02-29 2025-02-28
2025-02-28
2026 53
2024-12-31 1970-01-01
320 true 2 Wednesday
error
```

## Times of day and date-times

A `time_of_day` runs from `00:00:00` to `23:59:59.999999999`. It has `hour()`, `minute()`, `second()`, `nanos()` and `nanosOfDay()`, and prints with the fraction only when there is one. `plus(d)` returns a `day_shift` with the new `time` and how many whole `days` it moved.

A `date_time` has `date()` and `timeOfDay()`, prints as `2026-11-17T09:47:23` (RFC 3339 without an offset), and adds a duration by exact time (a day there is 24 hours). `atUtc()` reads it as a `moment`, and `since(other)` gives a `duration`.

```pelago
import std.calendar
import std.time
import { time_error } = std.time

fn main() -> void ! time_error {
    const t = calendar.timeOf(23, 0, 0, 0)?
    const s = t.plus(time.hours(2))
    print(s.time, s.days)
    const dt = calendar.dateTimeOf(calendar.dateOf(2026, 11, 17)?, calendar.timeOf(9, 47, 23, 500000000)?)
    print(dt, dt.plus(time.days(1)), dt.atUtc().unixSeconds())
    const m = time.fromUnix(1700000000)
    print(calendar.fromMoment(m))
    print(dt.since(calendar.dateTimeOf(calendar.dateOf(2026, 11, 16)?, calendar.timeOf(0, 0, 0, 0)?)))
}
```

```text
01:00:00 1
2026-11-17T09:47:23.5 2026-11-18T09:47:23.5 1794908843
2023-11-14T22:13:20
121643.5s
```

Time zones, text formats and the zone database are the next pieces of the time library: see [Time](./time.md).
