"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 把字符串转换为utf8编码字节数组
 * @param {string} raw
 * @return {number[]}
 */
exports.toBytes = function (raw) {
    var bytes = [];
    var i = 0;
    while (i < raw.length) {
        var charCode = raw.charCodeAt(i);
        if (charCode < 0x80) {
            // ascii码直接转换
            bytes.push(charCode);
            i += 1;
        }
        else if (charCode < 0x800) {
            // 两个字节表示一个字符
            bytes.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f));
            i += 1;
        }
        else if (charCode < 0xd800 || charCode >= 0xe000) {
            // 三个字节表示一个字符的情况
            bytes.push(0xe0 | (charCode >> 12), 0x80 | ((charCode >> 6) & 0x3f), 0x80 | (charCode & 0x3f));
            i += 1;
        }
        else {
            // 4个字节表示一个字符的情况
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charCode = 0x10000 + (((charCode & 0x3ff) << 10) | (raw.charCodeAt(i + 1) & 0x3ff));
            bytes.push(0xf0 | (charCode >> 18), 0x80 | ((charCode >> 12) & 0x3f), 0x80 | ((charCode >> 6) & 0x3f), 0x80 | (charCode & 0x3f));
            i += 2;
        }
    }
    return bytes;
};
/**
 * 把utf8字节数组还原为字符
 * @param {number[]} bytes
 * @return {string}
 */
exports.toString = function (bytes) {
    var raw = '';
    var i = 0;
    while (i < bytes.length) {
        var charCode = bytes[i];
        if (charCode < 0x80) {
            raw += String.fromCharCode(charCode);
            i += 1;
        }
        else if (charCode > 0xbf && charCode < 0xe0) {
            charCode = (charCode & 0x1f) << 6;
            charCode |= bytes[i + 1] & 0x3f;
            raw += String.fromCharCode(charCode);
            i += 2;
        }
        else if (charCode > 0xdf && charCode < 0xf0) {
            charCode = (charCode & 0x0f) << 12;
            charCode |= (bytes[i + 1] & 0x3f) << 6;
            charCode |= bytes[i + 2] & 0x3f;
            raw += String.fromCharCode(charCode);
            i += 3;
        }
        else {
            // surrogate pair
            charCode = (charCode & 0x07) << 18;
            charCode |= (bytes[i + 1] & 0x3f) << 12;
            charCode |= (bytes[i + 2] & 0x3f) << 6;
            charCode |= bytes[i + 3] & 0x3f;
            charCode -= 0x010000;
            raw += String.fromCharCode((charCode >> 10) | 0xd800, (charCode & 0x03ff) | 0xdc00);
            i += 4;
        }
    }
    return raw;
};
//# sourceMappingURL=index.js.map