/**
 * 把字符串转换为utf8编码字节数组
 * @param {string} str
 * @return {Array<number[]>}
 */
export function toArray (str: string): Array<number[]> {
  const arr: Array<number[]> = []
  let i = 0
  while (i < str.length) {
    let charCode = str.charCodeAt(i)
    const charCodes = []
    if (charCode < 0x80) {
      // ascii码直接转换
      charCodes.push(charCode)
      i += 1
    } else if (charCode < 0x800) {
      // 两个字节表示一个字符
      charCodes.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f))
      i += 1
    } else if (charCode < 0xd800 || charCode >= 0xe000) {
      // 三个字节表示一个字符的情况
      charCodes.push(0xe0 | (charCode >> 12), 0x80 | ((charCode >> 6) & 0x3f), 0x80 | (charCode & 0x3f))
      i += 1
    } else {
      // 4个字节表示一个字符的情况
      // UTF-16 encodes 0x10000-0x10FFFF by
      // subtracting 0x10000 and splitting the
      // 20 bits of 0x0-0xFFFFF into two halves
      charCode = 0x10000 + (((charCode & 0x3ff) << 10) | (str.charCodeAt(i + 1) & 0x3ff))
      charCodes.push(
        0xf0 | (charCode >> 18),
        0x80 | ((charCode >> 12) & 0x3f),
        0x80 | ((charCode >> 6) & 0x3f),
        0x80 | (charCode & 0x3f)
      )
      i += 2
    }
    arr.push(charCodes)
  }
  return arr
}

/**
 * 把utf8编码字节数组转换为字符串
 * @param {Array<number[]>} arr
 * @return {string}
 */
export function toString (arr: Array<number[]>): string {
  let str = ''
  let i = 0
  while (i < arr.length) {
    const charCodes = arr[i]
    let charCode = charCodes[0]
    if (charCode < 0x80) {
      str += String.fromCharCode(charCode)
    } else if (charCode > 0xbf && charCode < 0xe0) {
      charCode = (charCode & 0x1f) << 6
      charCode |= charCodes[1] & 0x3f
      str += String.fromCharCode(charCode)
    } else if (charCode > 0xdf && charCode < 0xf0) {
      charCode = (charCode & 0x0f) << 12
      charCode |= (charCodes[1] & 0x3f) << 6
      charCode |= charCodes[2] & 0x3f
      str += String.fromCharCode(charCode)
    } else {
      // surrogate pair
      charCode = (charCode & 0x07) << 18
      charCode |= (charCodes[1] & 0x3f) << 12
      charCode |= (charCodes[2] & 0x3f) << 6
      charCode |= charCodes[3] & 0x3f
      charCode -= 0x010000
      str += String.fromCharCode((charCode >> 10) | 0xd800, (charCode & 0x03ff) | 0xdc00)
    }
    i++
  }
  return str
}
