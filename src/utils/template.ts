import * as ejs from 'ejs';
import { camelCase, toUpper, snakeCase } from 'lodash';
const pascalCase = (str: string) => camelCase(str).replace(/^(.)/, toUpper);

export interface TemplateData {
    moduleName: string,
    camelCase?: any,
    pascalCase?: any,
    snakeCase?: any
}
export function render(content: string, data: TemplateData) {
    return ejs.render(content, { ...data, camelCase, pascalCase, snakeCase });
}