import { toBytes, toString } from './src'

const str = '56\u0020你好 🚀'

const bytes = toBytes(str)
const raw = toString(bytes)

console.log(bytes, raw, raw === str)
