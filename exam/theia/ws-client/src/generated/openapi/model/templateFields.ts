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

export class TemplateFields {
    'name'?: boolean;
    'content'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "name",
            "baseName": "name",
            "type": "boolean"
        },
        {
            "name": "content",
            "baseName": "content",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return TemplateFields.attributeTypeMap;
    }
}

