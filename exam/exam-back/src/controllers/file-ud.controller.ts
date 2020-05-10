import { FileUdService } from '../services';
import { inject, service } from '@loopback/core';
import { get, oas, param, post, requestBody } from '@loopback/openapi-v3';
import { HttpErrors, Request, Response, RestBindings } from '@loopback/rest';
import path from 'path';
import { readdirSync } from 'fs';
import { STORAGE_DIRECTORY } from '../keys';
import { FileUploadHandler } from '../types';

export class FileUdController {
  constructor(
    @service(FileUdService) private FUDHandler: FileUploadHandler,
    @inject(STORAGE_DIRECTORY) private storageDirectory: string,
  ) {
  }

  @post('/files/u', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  async fileUpload(
    @requestBody.file()
      request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      this.FUDHandler(request, response, (err: unknown) => {
        if (err) reject(err);
        else {
          resolve(FileUdController.getFilesAndFields(request));
        }
      });
    });
  }

  @get('/files/ls', {
    responses: {
      200: {
        content: {
          // string[]
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'A list of files',
      },
    },
  })
  async listFiles() {
    return readdirSync(this.storageDirectory);
  }

  @get('/files/dl/{filename}')
  @oas.response.file()
  downloadFile(
    @param.path.string('filename') fileName: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const file = this.validateFileName(fileName);
    response.download(file, fileName);
    return response;
  }

  /**
   * Validate file names to prevent them goes beyond the designated directory
   * @param fileName - File name
   */
  private validateFileName(fileName: string) {
    const resolved = path.resolve(this.storageDirectory, fileName);
    if (resolved.startsWith(this.storageDirectory)) return resolved;
    // The resolved file is outside sandbox
    throw new HttpErrors.BadRequest(`Invalid file name: ${fileName}`);
  }

  /**
   * Get files and fields for the request
   * @param request - Http request
   */
  private static getFilesAndFields(request: Request) {
    const uploadedFiles = request.files;
    const mapper = (f: globalThis.Express.Multer.File) => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      encoding: f.encoding,
      mimetype: f.mimetype,
      size: f.size,
    });
    let files: object[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }
    return { files, fields: request.body };
  }
}
