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
import { TlaResult } from './tlaResult';

/**
* (tsType: TimelineAnalysis, schemaOptions: { title: \'NewTimelineAnalysis\' })
*/
export class NewTimelineAnalysis {
    'record': number;
    'finished': boolean;
    'result'?: TlaResult;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "record",
            "baseName": "record",
            "type": "number"
        },
        {
            "name": "finished",
            "baseName": "finished",
            "type": "boolean"
        },
        {
            "name": "result",
            "baseName": "result",
            "type": "TlaResult"
        }    ];

    static getAttributeTypeMap() {
        return NewTimelineAnalysis.attributeTypeMap;
    }
}

