export * from './answerControllerApi';
import { AnswerControllerApi } from './answerControllerApi';
export * from './fileUdControllerApi';
import { FileUdControllerApi } from './fileUdControllerApi';
export * from './pingControllerApi';
import { PingControllerApi } from './pingControllerApi';
export * from './questionControllerApi';
import { QuestionControllerApi } from './questionControllerApi';
export * from './recordControllerApi';
import { RecordControllerApi } from './recordControllerApi';
export * from './templateControllerApi';
import { TemplateControllerApi } from './templateControllerApi';
export * from './tlAnalysisControllerApi';
import { TlAnalysisControllerApi } from './tlAnalysisControllerApi';
export * from './userControllerApi';
import { UserControllerApi } from './userControllerApi';
export * from './workspaceControllerApi';
import { WorkspaceControllerApi } from './workspaceControllerApi';
import * as fs from 'fs';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export interface RequestDetailedFile {
    value: Buffer;
    options?: {
        filename?: string;
        contentType?: string;
    }
}

export type RequestFile = string | Buffer | fs.ReadStream | RequestDetailedFile;

export const APIS = [AnswerControllerApi, FileUdControllerApi, PingControllerApi, QuestionControllerApi, RecordControllerApi, TemplateControllerApi, TlAnalysisControllerApi, UserControllerApi, WorkspaceControllerApi];
