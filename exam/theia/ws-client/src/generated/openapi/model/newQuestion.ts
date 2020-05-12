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

/**
* (tsType: Omit<Question, \'id\'>, schemaOptions: { title: \'NewQuestion\', exclude: [ \'id\' ] })
*/
export class NewQuestion {
    'title': string;
    'author'?: string;
    'score'?: string;
    'brief'?: string;
    'detail': string;
    'examples'?: Array<object>;
    'examination'?: number;
    'templateName'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "title",
            "baseName": "title",
            "type": "string"
        },
        {
            "name": "author",
            "baseName": "author",
            "type": "string"
        },
        {
            "name": "score",
            "baseName": "score",
            "type": "string"
        },
        {
            "name": "brief",
            "baseName": "brief",
            "type": "string"
        },
        {
            "name": "detail",
            "baseName": "detail",
            "type": "string"
        },
        {
            "name": "examples",
            "baseName": "examples",
            "type": "Array<object>"
        },
        {
            "name": "examination",
            "baseName": "examination",
            "type": "number"
        },
        {
            "name": "templateName",
            "baseName": "templateName",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return NewQuestion.attributeTypeMap;
    }
}

