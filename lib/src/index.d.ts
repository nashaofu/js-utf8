/**
 * 把字符串转换为utf8编码字节数组
 * @param {string} raw
 * @return {number[]}
 */
export declare const toBytes: (raw: string) => number[];
/**
 * 把utf8字节数组还原为字符
 * @param {number[]} bytes
 * @return {string}
 */
export declare const toString: (bytes: number[]) => string;
