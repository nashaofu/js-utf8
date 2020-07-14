# js-utf8

js-utf8 is a UTF-8 encoder/decoder for Nodejs and Browser

## Install

[![NPM](https://nodei.co/npm/js-utf8.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/js-utf8/)

## Usage

```js
import { toArray, toString } from 'js-utf8'

const raw = '56\u0020你好 🚀'

const arr = toArray(raw)
const str = toString(arr)

console.log('raw:', raw)
console.log('arr:', arr)
console.log('str: ', str)
console.log('raw === str: ', raw === str)
// raw: 56 你好 🚀
// arr: [
//   [ 53 ],
//   [ 54 ],
//   [ 32 ],
//   [ 228, 189, 160 ],
//   [ 229, 165, 189 ],
//   [ 32 ],
//   [ 240, 159, 154, 128 ]
// ]
// str:  56 你好 🚀
// raw === str:  true
```

## API

- toArray: convert string to utf8 encoded byte array

```ts
function toArray (str: string): Array<number[]>
```

- toString: convert utf8 encoded byte array to string

```ts
function toString (arr: Array<number[]>): string
```
