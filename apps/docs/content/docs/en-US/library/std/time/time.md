---
title: std.time
description: Clocks, durations and sleeping.
---

```text
import std.time
```

Three kinds of value, never mixed by accident:

- a **`duration`**, a length of time that carries its unit, so there is no bare `int` that might mean seconds or milliseconds;
- an **`instant`**, a point on the monotonic clock, where only differences mean anything (use it to measure);
- a **`moment`**, a point on the UTC timeline from the wall clock (use it to say when).

A `duration` is whole nanoseconds in an `int` (about 292 years either way). Arithmetic on it stops the program on overflow like any other integer arithmetic; where a caller can run out of range there are `checked...` (an `option`) and `saturating...` forms. A `moment` is seconds and nanoseconds, so it reaches billions of years either way. A clock can fail with an `io_error` where the system refuses.

## Durations

| Function | Result | Notes |
| --- | --- | --- |
| `time.days(n)`, `time.hours(n)`, `time.minutes(n)`, `time.seconds(n)` | `duration` | A day is exactly 24 hours. Calendar days, which can be 23 or 25 hours long in a zone, come with [time zones](./zone.md). |
| `time.millis(n)`, `time.micros(n)`, `time.nanos(n)` | `duration` | |
| `time.fromSeconds(s)` | `duration ! time_error` | From a `float` with a fraction; an error for NaN, infinity or a value out of range. |
| `time.zero()`, `time.longest()`, `time.shortest()` | `duration` | |

| Method | Result | Notes |
| --- | --- | --- |
| `asNanos()`, `asMicros()`, `asMillis()`, `asSeconds()` | `int` | The length in that unit, rounded towards zero. |
| `asSecondsFloat()` | `float` | |
| `subsecNanos()` | `int` | The nanoseconds left after whole seconds. |
| `abs()`, `signum()`, `isZero()`, `isNegative()` | | |
| `max(o)`, `min(o)`, `clamp(lo, hi)` | `duration` | |
| `a + b`, `a - b`, `-a`, `a % b` | `duration` | Stops on overflow. |
| `times(n)`, `divInt(n)` | `duration` | Scale by a whole number. `d * 2` is not an operator; write `d.times(2)`. |
| `ratio(o)`, `remainder(o)` | `int`, `duration` | How many whole `o` fit, and what is left. |
| `checkedAdd(o)`, `checkedSub(o)`, `checkedMul(n)` | `duration?` | `none` when the result does not fit. |
| `saturatingAdd(o)`, `saturatingSub(o)`, `saturatingMul(n)` | `duration` | Held at `longest` or `shortest`. |
| comparisons | `bool` | `==`, `!=`, `<`, `<=`, `>`, `>=`. |

```pelago
import std.time

fn main() {
    print(time.days(1), time.hours(2), time.minutes(90), time.seconds(3), time.millis(250), time.micros(42), time.nanos(7))
    print(time.days(1).asSeconds(), time.hours(1).asMillis(), time.minutes(1).asSeconds())
    const a = time.seconds(10)
    print(a.times(3), a.divInt(4), a % time.seconds(3), a.ratio(time.seconds(3)))
    print(time.seconds(-5).abs(), time.seconds(-3).signum(), (-a).isNegative())
    print(time.seconds(9).clamp(time.seconds(1), time.seconds(5)))
    print(time.fromSeconds(1.5).or(time.zero()), time.fromSeconds(1e12).isErr())
}
```

```text
86400s 7200s 5400s 3s 250ms 42us 7ns
86400 3600000 60
30s 2.5s 1s 3
5s -1 true
5s
1.5s true
```

```pelago
import std.time

fn main() {
    const big = time.longest()
    print(big.checkedAdd(time.nanos(1)) == none)
    print(time.seconds(1).checkedAdd(time.seconds(2)) ?? time.zero())
    print(big.saturatingAdd(time.seconds(1)) == time.longest())
    print(time.days(10000).saturatingMul(1000000) == time.longest())
    print(time.seconds(2).checkedMul(3) ?? time.zero())
}
```

```text
true
3s
true
true
6s
```

## Clocks and instants

| Function | Result | Notes |
| --- | --- | --- |
| `time.now()` | `instant ! io_error` | The monotonic clock: it never goes back, whatever the date is set to. |
| `time.sinceEpoch()` | `duration ! io_error` | The wall clock as a length since 1970-01-01 UTC. |
| `time.sleep(d)` | | Wait for `d`. Other tasks run meanwhile. |
| `instant.elapsed()` | `duration ! io_error` | The time since this instant. |
| `instant.since(earlier)` | `duration` | Negative when it is before. |
| `instant.plus(d)`, `instant.minus(d)` | `instant` | `checkedPlus(d)` gives an option. |
| comparisons | `bool` | Instants compare with `==`, `<` and so on. |

## Moments

A `moment` is whole seconds since 1970-01-01 00:00:00 UTC (negative before it) plus nanoseconds, always normalised so two moments compare by their fields. The wall clock can be set back, so use an `instant` to measure and a `moment` to say when.

| Function or method | Result | Notes |
| --- | --- | --- |
| `time.wallNow()` | `moment ! io_error` | The wall clock now. It can jump when the date is set. |
| `time.fromUnix(s)`, `time.fromUnixMillis(ms)` | `moment` | |
| `time.momentOf(s, n)` | `moment?` | Seconds and nanoseconds; `n` may be any `int` and carries into the seconds. `none` when the seconds do not fit. |
| `unixSeconds()`, `unixMillis()`, `subsecNanos()` | `int` | Seconds and milliseconds are cut towards minus infinity. |
| `plus(d)`, `minus(d)` | `moment` | Stops when the seconds do not fit. `checkedPlus` and `checkedMinus` give an option. |
| `since(earlier)` | `duration` | Stops when the two are more than about 292 years apart; `checkedSince` gives an option. |
| `elapsed()` | `duration ! io_error` | How long ago this moment was on the wall clock. |

A moment prints as seconds since the epoch with nine decimals. Calendar text comes with `std.timefmt`.

```pelago
import std.time

fn main() {
    const m = time.fromUnix(1700000000)
    print(m, m.unixSeconds(), m.unixMillis())
    const later = m.plus(time.hours(1) + time.millis(500))
    print(later, later.since(m))
    print(later.subsecNanos(), later > m, m.minus(time.days(1)))
    print(time.fromUnixMillis(-1500))
    print(time.momentOf(5, -1) ?? time.fromUnix(0))
    print(m.checkedPlus(time.seconds(1)) != none)
}
```

```text
1700000000.000000000 1700000000 1700000000000
1700003600.500000000 3600.5s
500000000 true 1699913600.000000000
-1.500000000
4.999999999
true
```

## Printing durations

A duration prints with the largest unit that keeps the number readable: `1.5s`, `250ms`, `42us` or `7ns`. Milliseconds and microseconds are cut towards zero when printed (`1500ns` prints as `1us`), so use `asNanos()` when you need the exact number.

```pelago
import std.time

fn main() {
    const a = time.millis(5)
    const b = time.seconds(1)
    print(a <= b, a > b, a >= a, a != b)
    print(time.nanos(1500).asNanos(), time.nanos(1500))
}
```

```text
true false true true
1500 1us
```

```pelago
import std.time

fn main() {
    const d = time.seconds(90) + time.millis(500)
    print(d, d.asMillis(), d.asSeconds(), d.asSecondsFloat())
    print(time.millis(1500) - time.seconds(2), time.millis(5) < time.seconds(1))
    switch time.now() {
        case ok(start):
            time.sleep(time.millis(20))
            switch start.elapsed() {
                case ok(e): print(e.asMillis() >= 20)
                case err(_): print("no clock")
            }
        case err(_): print("no clock")
    }
}
```

```text
90.5s 90500 90 90.5
-500ms true
true
```

The clocks work on Linux (x86-64 and AArch64), Windows (x86-64 and ARM64) and macOS (AArch64).

`sleep` asks the kernel to pause when every task is waiting, so it costs no processor time on Linux, macOS and Windows.

`select` can use a duration as a time limit: see [Concurrency](../../../guide/concurrency.md).

## Timers and deadlines

Timers keep a fixed rhythm: they measure from an instant, not from when the last piece of work finished, so the time the work took does not add up. All of them can fail with `io_error` where the clock does.

| Function | Result | Notes |
| --- | --- | --- |
| `time.deadline(d)` | `instant ! io_error` | The instant `d` from now. |
| `time.sleepUntil(instant)` | `void ! io_error` | Pauses the task until then; returns at once when it has passed. Other tasks keep running. |
| `instant.hasPassed()` | `bool ! io_error` | Whether the instant is now or in the past. |
| `time.startStopwatch()` | `stopwatch ! io_error` | A stopwatch started now. |
| `time.ticker(period)` | `receiver<instant> ! io_error` | A receiver that gets the instant of each tick; `period` must be positive. |

A `stopwatch` has `elapsed()` (time since it started), `lap!()` (time since the last lap, and starts the next one) and `restart!()`.

A ticker's ticks keep their rhythm: the next is `period` after the last was *due*, not after it was received. When the receiver is slow the ticks it missed are skipped, never queued. The ticker stops when you drop the receiver. Use it in a `select` beside `case timeout(...)` (see [Concurrency](../../../guide/concurrency.md)).

```pelago
import std.time

fn main() -> void ! io_error {
    var watch = time.startStopwatch()?
    const due = time.deadline(time.millis(30))?
    print(due.hasPassed()?)
    time.sleepUntil(due)?
    print(due.hasPassed()?, (watch.elapsed()?) >= time.millis(30))
    const lap = watch.lap!()?
    print(lap >= time.millis(30), (watch.lap!()?) < time.millis(30))
    const ticks = time.ticker(time.millis(10))?
    var n = 0
    while n < 3 {
        const t = ticks.recv()
        n += 1
    }
    print("ticks", n)
}
```

```text
false
true true
true true
ticks 3
```

## What is not there yet

- **Operators for scaling.** `d * 2` and `d / 2` are compile errors, because `duration` does not provide `mul` or `div`. Use `d.times(2)` and `d.divInt(2)`.
- **Instants.** An `instant` has `==`, `<` and the rest, but no `print` and no `-`. Use `a.since(b)`.
- **A timeout call.** There is no `time.timeout`: for a time limit use `select` with `case timeout(d)` (see [Concurrency](../../../guide/concurrency.md)).
