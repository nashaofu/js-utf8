# js-utf8

js-utf8 is a UTF-8 encoder/decoder for Nodejs and Browser

## Install

[![NPM](https://nodei.co/npm/js-utf8.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/js-utf8/)

## Usage

```js
import { toBytes, toString } from 'js-utf8'

const str = `56\u0020你好 🚀`

const bytes = toBytes(str)
const raw = toString(bytes)

console.log(bytes, raw, raw === str)
// [ 53, 54, 32, 228, 189, 160, 229, 165, 189, 32, 240, 159, 154, 128 ] '56 你好 🚀' true
```

## API

- toBytes: Convert string to UTF8 encoding array

```ts
toBytes: (raw: string) => number[]
```

- toString: Convert UTF8 encoding array to string

```ts
toString: (bytes: number[]): string
```
