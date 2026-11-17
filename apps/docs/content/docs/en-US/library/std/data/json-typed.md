---
title: Typed JSON
description: Decode and encode JSON straight into your structs and enums, with field renaming and a strict mode.
---

```text
import std.json
```

Instead of walking a `value`, you can describe the data as a struct or enum and let the compiler write the code. `@derive(fromJson)` adds `<name>Decode(text)`, which returns the type or a `json_error`; `@derive(toJson)` adds `<name>Encode(x)`, which returns compact JSON text. For a struct called `point` they are `pointDecode` and `pointEncode`.

```pelago
import std.json

@derive(fromJson, toJson)
struct point { x: int, y: int }

@derive(fromJson, toJson)
struct server {
    host: string
    port: uint16
    tags: [string]
    tls: bool = false
    note: string?
    origin: point
}

fn main() {
    const text = "{\"host\": \"a\", \"port\": 80, \"tags\": [\"x\"], \"origin\": {\"x\": 1, \"y\": -2}, \"extra\": 1}"
    switch serverDecode(text) {
        case ok(s):
            print("#(s.host):#(s.port) tls=#(s.tls) note=#(s.note) origin=#(s.origin.x),#(s.origin.y)")
            print(serverEncode(s))
        case err(e): print("error #e")
    }
    switch serverDecode("{\"host\": \"a\", \"port\": 70000, \"tags\": [], \"origin\": {\"x\": 1, \"y\": 2}}") {
        case ok(_): print("unexpected")
        case err(e): print("error #e")
    }
}
```

```text
a:80 tls=false note=none origin=1,-2
{"host":"a","port":80,"tags":["x"],"tls":false,"note":null,"origin":{"x":1,"y":-2}}
error 1:23: $.port: 70000 does not fit in uint16 (0 to 65535)
```

Wide integers (`int128`, `uint128`, `int256`, `uint256`) and the soft floats (`float16`, `float128`, `float256`) are written as JSON strings so that no precision is lost; see [wide integers](../../core/wide-integers.md#json).

The rules:

- Numbers are exact. An integer field reads an integer and stops with an error when the number does not fit the type, so a `uint16` never wraps.
- A field with a default may be missing. An optional field (`T?`) may be missing or `null`. An unknown field in the input is ignored.
- Lists, nested structs, tuples and fixed-size arrays work as fields. A [braid](../../../guide/braids.mdx) is one flat array.
- An enum with no payloads is a string (`"blue"`). A case with a payload is an object with one key, the case name: `{"circle": {"radius": 2}}`.
- An error says where: line and column in the text, then the path in the value, such as `$.tags[1]: expected text, found an integer` or `$.origin: missing field "y"`.
- What `toJson` writes, `fromJson` reads back to the same value.

## Renaming fields

`@json("user_id")` on a field makes `user_id` the key in the document while the field keeps its name. It applies to reading and writing. Variant labels of an enum cannot be renamed yet.

```pelago
import std.json

@derive(fromJson, toJson)
struct user {
    @json("user_id")
    id: int
    @json("display-name")
    name: string
    admin: bool = false
}

fn main() {
    switch userDecode("{\"user_id\": 7, \"display-name\": \"Ada\"}") {
        case ok(u):
            print("#(u.id) #(u.name) #(u.admin)")
            print(userEncode(u))
        case err(e): print("error #e")
    }
    switch userDecode("{\"id\": 7, \"name\": \"Ada\"}") {
        case ok(_): print("unexpected")
        case err(e): print("error #e")
    }
}
```

```text
7 Ada false
{"user_id":7,"display-name":"Ada","admin":false}
error 1:1: $: missing field "user_id"
```

A renamed field is looked up by its document key only, so the second document above fails on `user_id`, not on `id`.

## Strict mode

By default a decoder is forgiving, because documents grow: an unknown key is ignored, a repeated key keeps the first one, and the bytes are not checked.

`@json(strict)` on a struct or enum makes `<type>Decode` refuse an unknown key (`unknown field "x"`, with path, line and column). It also reads with `json.documentStrict`, which refuses a repeated key (`duplicate field "k"`) and text that is not valid UTF-8. You can call `json.documentStrict(text)` yourself when you walk a `value`.

Strict checking is per type: a nested type is strict only if it says so. The duplicate-key and UTF-8 checks cover the whole document.

```pelago
import std.json

@derive(fromJson)
@json(strict)
struct limits {
    @json("max_conn")
    maxConn: int
    note: string?
}

@derive(fromJson)
struct lax {
    maxConn: int
}

fn main() {
    switch limitsDecode("{\"max_conn\": 10, \"nmae\": \"typo\"}") {
        case ok(_): print("unexpected")
        case err(e): print("error #e")
    }
    switch limitsDecode("{\"max_conn\": 10, \"max_conn\": 99}") {
        case ok(_): print("unexpected")
        case err(e): print("error #e")
    }
    switch laxDecode("{\"maxConn\": 10, \"anything\": true}") {
        case ok(l): print("lax: #(l.maxConn)")
        case err(e): print("error #e")
    }
    switch json.documentStrict("{\"a\": 1, \"a\": 2}") {
        case ok(_): print("unexpected")
        case err(e): print("error #e")
    }
}
```

```text
error 1:26: $.nmae: unknown field "nmae"
error 1:30: $.max_conn: duplicate field "max_conn"
lax: 10
error 1:15: $.a: duplicate field "a"
```

## Map fields

A field of type `map<string, V>` is a JSON object whose members all have type `V`. Writing keeps the map's insertion order, and reading builds the map in the order the members appear (a repeated key keeps the last value). A member of the wrong type is an error with its path, and so is a value that is not an object. A map whose keys are not `string` gives an error; other key types are not supported yet.

```pelago
import std.json
import { json_error } = std.json

@derive(fromJson, toJson)
struct scene {
    name: string
    scores: map<string, int>
}

fn main() {
    switch sceneDecode("{\"name\": \"s\", \"scores\": {\"b\": 2, \"a\": 1}}") {
        case ok(s):
            print(s.scores.len(), s.scores.get("a"))
            print(sceneEncode(s))
        case err(e): print("error #e")
    }
    switch sceneDecode("{\"name\": \"s\", \"scores\": {\"a\": \"one\"}}") {
        case ok(s): print(s.scores.len())
        case err(e): print("error #e")
    }
    switch sceneDecode("{\"name\": \"s\", \"scores\": [1]}") {
        case ok(s): print(s.scores.len())
        case err(e): print("error #e")
    }
}
```

```text
2 some(1)
{"name":"s","scores":{"b":2,"a":1}}
error 1:31: $.scores.a: expected a whole number, found text
error 1:25: $.scores: expected an object, found an array
```

## What is not there yet

- Maps with keys other than `string`.
- Renaming enum variants.
- Generic types.
- Pretty printing.
