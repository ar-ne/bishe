export * from './answer';
export * from './answerFields';
export * from './answerFilter';
export * from './answerFilter1';
export * from './answerPartial';
export * from './answerWithRelations';
export * from './inlineObject';
export * from './loopbackCount';
export * from './newAnswer';
export * from './newQuestion';
export * from './newRecord';
export * from './newTemplate';
export * from './newTimelineAnalysis';
export * from './pingResponse';
export * from './question';
export * from './questionFields';
export * from './questionFilter';
export * from './questionFilter1';
export * from './questionPartial';
export * from './questionWithRelations';
export * from './record';
export * from './recordFields';
export * from './recordFilter';
export * from './recordFilter1';
export * from './recordPartial';
export * from './recordWithRelations';
export * from './template';
export * from './templateFields';
export * from './templateFilter';
export * from './templateFilter1';
export * from './templatePartial';
export * from './templateWithRelations';
export * from './timelineAnalysis';
export * from './timelineAnalysisFields';
export * from './timelineAnalysisFilter';
export * from './timelineAnalysisFilter1';
export * from './timelineAnalysisPartial';
export * from './timelineAnalysisWithRelations';
export * from './tlaResult';
export * from './tlaResultWithRelations';
export * from './tlaTimelineItem';
export * from './tlaTimelineItemWithRelations';
export * from './userInfo';
export * from './userTrack';
export * from './userTrackAcrion';
export * from './userTrackInfo';
export * from './workspaceSession';
export * from './workspaceSessionFields';
export * from './workspaceSessionFilter';
export * from './workspaceSessionWithRelations';

import localVarRequest = require('request');

import { Answer } from './answer';
import { AnswerFields } from './answerFields';
import { AnswerFilter } from './answerFilter';
import { AnswerFilter1 } from './answerFilter1';
import { AnswerPartial } from './answerPartial';
import { AnswerWithRelations } from './answerWithRelations';
import { InlineObject } from './inlineObject';
import { LoopbackCount } from './loopbackCount';
import { NewAnswer } from './newAnswer';
import { NewQuestion } from './newQuestion';
import { NewRecord } from './newRecord';
import { NewTemplate } from './newTemplate';
import { NewTimelineAnalysis } from './newTimelineAnalysis';
import { PingResponse } from './pingResponse';
import { Question } from './question';
import { QuestionFields } from './questionFields';
import { QuestionFilter } from './questionFilter';
import { QuestionFilter1 } from './questionFilter1';
import { QuestionPartial } from './questionPartial';
import { QuestionWithRelations } from './questionWithRelations';
import { Record } from './record';
import { RecordFields } from './recordFields';
import { RecordFilter } from './recordFilter';
import { RecordFilter1 } from './recordFilter1';
import { RecordPartial } from './recordPartial';
import { RecordWithRelations } from './recordWithRelations';
import { Template } from './template';
import { TemplateFields } from './templateFields';
import { TemplateFilter } from './templateFilter';
import { TemplateFilter1 } from './templateFilter1';
import { TemplatePartial } from './templatePartial';
import { TemplateWithRelations } from './templateWithRelations';
import { TimelineAnalysis } from './timelineAnalysis';
import { TimelineAnalysisFields } from './timelineAnalysisFields';
import { TimelineAnalysisFilter } from './timelineAnalysisFilter';
import { TimelineAnalysisFilter1 } from './timelineAnalysisFilter1';
import { TimelineAnalysisPartial } from './timelineAnalysisPartial';
import { TimelineAnalysisWithRelations } from './timelineAnalysisWithRelations';
import { TlaResult } from './tlaResult';
import { TlaResultWithRelations } from './tlaResultWithRelations';
import { TlaTimelineItem } from './tlaTimelineItem';
import { TlaTimelineItemWithRelations } from './tlaTimelineItemWithRelations';
import { UserInfo } from './userInfo';
import { UserTrack } from './userTrack';
import { UserTrackAcrion } from './userTrackAcrion';
import { UserTrackInfo } from './userTrackInfo';
import { WorkspaceSession } from './workspaceSession';
import { WorkspaceSessionFields } from './workspaceSessionFields';
import { WorkspaceSessionFilter } from './workspaceSessionFilter';
import { WorkspaceSessionWithRelations } from './workspaceSessionWithRelations';

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];

let enumsMap: {[index: string]: any} = {
}

let typeMap: {[index: string]: any} = {
    "Answer": Answer,
    "AnswerFields": AnswerFields,
    "AnswerFilter": AnswerFilter,
    "AnswerFilter1": AnswerFilter1,
    "AnswerPartial": AnswerPartial,
    "AnswerWithRelations": AnswerWithRelations,
    "InlineObject": InlineObject,
    "LoopbackCount": LoopbackCount,
    "NewAnswer": NewAnswer,
    "NewQuestion": NewQuestion,
    "NewRecord": NewRecord,
    "NewTemplate": NewTemplate,
    "NewTimelineAnalysis": NewTimelineAnalysis,
    "PingResponse": PingResponse,
    "Question": Question,
    "QuestionFields": QuestionFields,
    "QuestionFilter": QuestionFilter,
    "QuestionFilter1": QuestionFilter1,
    "QuestionPartial": QuestionPartial,
    "QuestionWithRelations": QuestionWithRelations,
    "Record": Record,
    "RecordFields": RecordFields,
    "RecordFilter": RecordFilter,
    "RecordFilter1": RecordFilter1,
    "RecordPartial": RecordPartial,
    "RecordWithRelations": RecordWithRelations,
    "Template": Template,
    "TemplateFields": TemplateFields,
    "TemplateFilter": TemplateFilter,
    "TemplateFilter1": TemplateFilter1,
    "TemplatePartial": TemplatePartial,
    "TemplateWithRelations": TemplateWithRelations,
    "TimelineAnalysis": TimelineAnalysis,
    "TimelineAnalysisFields": TimelineAnalysisFields,
    "TimelineAnalysisFilter": TimelineAnalysisFilter,
    "TimelineAnalysisFilter1": TimelineAnalysisFilter1,
    "TimelineAnalysisPartial": TimelineAnalysisPartial,
    "TimelineAnalysisWithRelations": TimelineAnalysisWithRelations,
    "TlaResult": TlaResult,
    "TlaResultWithRelations": TlaResultWithRelations,
    "TlaTimelineItem": TlaTimelineItem,
    "TlaTimelineItemWithRelations": TlaTimelineItemWithRelations,
    "UserInfo": UserInfo,
    "UserTrack": UserTrack,
    "UserTrackAcrion": UserTrackAcrion,
    "UserTrackInfo": UserTrackInfo,
    "WorkspaceSession": WorkspaceSession,
    "WorkspaceSessionFields": WorkspaceSessionFields,
    "WorkspaceSessionFilter": WorkspaceSessionFilter,
    "WorkspaceSessionWithRelations": WorkspaceSessionWithRelations,
}

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if(typeMap[discriminatorType]){
                        return discriminatorType; // use the type given in the discriminator
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string) {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.serialize(date, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return data.toISOString();
        } else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }

            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }

    public static deserialize(data: any, type: string) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.deserialize(date, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return new Date(data);
        } else {
            if (enumsMap[type]) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}

export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class HttpBearerAuth implements Authentication {
    public accessToken: string | (() => string) = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            const accessToken = typeof this.accessToken === 'function'
                            ? this.accessToken()
                            : this.accessToken;
            requestOptions.headers["Authorization"] = "Bearer " + accessToken;
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string = '';

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        } else if (this.location == 'cookie' && requestOptions && requestOptions.headers) {
            if (requestOptions.headers['Cookie']) {
                requestOptions.headers['Cookie'] += '; ' + this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
            else {
                requestOptions.headers['Cookie'] = this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(_: localVarRequest.Options): void {
        // Do nothing
    }
}

export type Interceptor = (requestOptions: localVarRequest.Options) => (Promise<void> | void);
