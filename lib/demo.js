"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("./src");
var str = "56 \u4F60\u597D \uD83D\uDE80";
var bytes = src_1.toBytes(str);
var raw = src_1.toString(bytes);
console.log(bytes, raw, raw === str);
//# sourceMappingURL=demo.js.map