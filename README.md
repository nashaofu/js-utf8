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
```
