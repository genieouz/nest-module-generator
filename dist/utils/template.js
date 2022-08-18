"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = void 0;
var ejs = require("ejs");
var lodash_1 = require("lodash");
var pascalCase = function (str) { return (0, lodash_1.camelCase)(str).replace(/^(.)/, lodash_1.toUpper); };
function render(content, data) {
    return ejs.render(content, __assign(__assign({}, data), { camelCase: lodash_1.camelCase, pascalCase: pascalCase, snakeCase: lodash_1.snakeCase }));
}
exports.render = render;
//# sourceMappingURL=template.js.map