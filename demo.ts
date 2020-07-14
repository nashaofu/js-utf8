import { toArray, toString } from './src'

const raw = '56\u0020你好 🚀'

const arr = toArray(raw)
const str = toString(arr)

console.log('raw:', raw)
console.log('arr:', arr)
console.log('str: ', str)
console.log('raw === str: ', raw === str)
