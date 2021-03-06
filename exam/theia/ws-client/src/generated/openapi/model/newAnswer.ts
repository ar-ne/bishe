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
* (tsType: Omit<Answer, \'id\'>, schemaOptions: { title: \'NewAnswer\', exclude: [ \'id\' ] })
*/
export class NewAnswer {
    'question': number;
    'content': string;
    'user': string;
    'judge'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "question",
            "baseName": "question",
            "type": "number"
        },
        {
            "name": "content",
            "baseName": "content",
            "type": "string"
        },
        {
            "name": "user",
            "baseName": "user",
            "type": "string"
        },
        {
            "name": "judge",
            "baseName": "judge",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return NewAnswer.attributeTypeMap;
    }
}

