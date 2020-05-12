/**
 * exam-back
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from '../api';
import { TemplateFields } from './templateFields';

export class TemplateFilter1 {
    'offset'?: number;
    'limit'?: number;
    'skip'?: number;
    'order'?: Array<string>;
    'where'?: { [key: string]: object; };
    'fields'?: TemplateFields;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "offset",
            "baseName": "offset",
            "type": "number"
        },
        {
            "name": "limit",
            "baseName": "limit",
            "type": "number"
        },
        {
            "name": "skip",
            "baseName": "skip",
            "type": "number"
        },
        {
            "name": "order",
            "baseName": "order",
            "type": "Array<string>"
        },
        {
            "name": "where",
            "baseName": "where",
            "type": "{ [key: string]: object; }"
        },
        {
            "name": "fields",
            "baseName": "fields",
            "type": "TemplateFields"
        }    ];

    static getAttributeTypeMap() {
        return TemplateFilter1.attributeTypeMap;
    }
}

