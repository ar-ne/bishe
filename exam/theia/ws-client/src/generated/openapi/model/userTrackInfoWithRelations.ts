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
import { UserTrackAcrionWithRelations } from './userTrackAcrionWithRelations';

/**
* (tsType: UserTrackInfoWithRelations, schemaOptions: { includeRelations: true })
*/
export class UserTrackInfoWithRelations {
    'time': string;
    'action'?: UserTrackAcrionWithRelations;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "time",
            "baseName": "time",
            "type": "string"
        },
        {
            "name": "action",
            "baseName": "action",
            "type": "UserTrackAcrionWithRelations"
        }    ];

    static getAttributeTypeMap() {
        return UserTrackInfoWithRelations.attributeTypeMap;
    }
}

