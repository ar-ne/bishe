// tslint:disable
/**
 * backend - backend
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as globalImportUrl from 'url';
import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface Body
 */
export interface Body {
    /**
     * 
     * @type {string}
     * @memberof Body
     */
    challenge?: string;
    /**
     * 
     * @type {boolean}
     * @memberof Body
     */
    submit?: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof Body
     */
    scope?: Array<string>;
    /**
     * 
     * @type {boolean}
     * @memberof Body
     */
    remember?: boolean;
}
/**
 * 
 * @export
 * @interface InlineObject
 */
export interface InlineObject {
    /**
     * 
     * @type {string}
     * @memberof InlineObject
     */
    username?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject
     */
    password?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject
     */
    challenge?: string;
    /**
     * 
     * @type {boolean}
     * @memberof InlineObject
     */
    remember?: boolean;
}
/**
 * 
 * @export
 * @interface InlineObject1
 */
export interface InlineObject1 {
    /**
     * 
     * @type {string}
     * @memberof InlineObject1
     */
    challenge?: string;
    /**
     * 
     * @type {boolean}
     * @memberof InlineObject1
     */
    submit?: boolean;
}
/**
 * 
 * @export
 * @interface PingResponse
 */
export interface PingResponse {
    /**
     * 
     * @type {string}
     * @memberof PingResponse
     */
    greeting?: string;
    /**
     * 
     * @type {string}
     * @memberof PingResponse
     */
    date?: string;
    /**
     * 
     * @type {string}
     * @memberof PingResponse
     */
    url?: string;
    /**
     * 
     * @type {{ [key: string]: object; }}
     * @memberof PingResponse
     */
    headers?: { [key: string]: object; };
}

/**
 * ConsentControllerApi - axios parameter creator
 * @export
 */
export const ConsentControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} consentChallenge 
         * @param {boolean} [xApplicationRequesting] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        consentControllerGetSlash(consentChallenge: string, xApplicationRequesting?: boolean, options: any = {}): RequestArgs {
            // verify required parameter 'consentChallenge' is not null or undefined
            if (consentChallenge === null || consentChallenge === undefined) {
                throw new RequiredError('consentChallenge','Required parameter consentChallenge was null or undefined when calling consentControllerGetSlash.');
            }
            const localVarPath = `/consent`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (consentChallenge !== undefined) {
                localVarQueryParameter['consent_challenge'] = consentChallenge;
            }

            if (xApplicationRequesting !== undefined && xApplicationRequesting !== null) {
                localVarHeaderParameter['x-application-requesting'] = String(JSON.stringify(xApplicationRequesting));
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {boolean} [xApplicationRequesting] 
         * @param {Body} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        consentControllerPostSlash(xApplicationRequesting?: boolean, body?: Body, options: any = {}): RequestArgs {
            const localVarPath = `/consent`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (xApplicationRequesting !== undefined && xApplicationRequesting !== null) {
                localVarHeaderParameter['x-application-requesting'] = String(JSON.stringify(xApplicationRequesting));
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ConsentControllerApi - functional programming interface
 * @export
 */
export const ConsentControllerApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} consentChallenge 
         * @param {boolean} [xApplicationRequesting] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        consentControllerGetSlash(consentChallenge: string, xApplicationRequesting?: boolean, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<object> {
            const localVarAxiosArgs = ConsentControllerApiAxiosParamCreator(configuration).consentControllerGetSlash(consentChallenge, xApplicationRequesting, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {boolean} [xApplicationRequesting] 
         * @param {Body} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        consentControllerPostSlash(xApplicationRequesting?: boolean, body?: Body, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<object> {
            const localVarAxiosArgs = ConsentControllerApiAxiosParamCreator(configuration).consentControllerPostSlash(xApplicationRequesting, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ConsentControllerApi - factory interface
 * @export
 */
export const ConsentControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {string} consentChallenge 
         * @param {boolean} [xApplicationRequesting] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        consentControllerGetSlash(consentChallenge: string, xApplicationRequesting?: boolean, options?: any): AxiosPromise<object> {
            return ConsentControllerApiFp(configuration).consentControllerGetSlash(consentChallenge, xApplicationRequesting, options)(axios, basePath);
        },
        /**
         * 
         * @param {boolean} [xApplicationRequesting] 
         * @param {Body} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        consentControllerPostSlash(xApplicationRequesting?: boolean, body?: Body, options?: any): AxiosPromise<object> {
            return ConsentControllerApiFp(configuration).consentControllerPostSlash(xApplicationRequesting, body, options)(axios, basePath);
        },
    };
};

/**
 * ConsentControllerApi - interface
 * @export
 * @interface ConsentControllerApi
 */
export interface ConsentControllerApiInterface {
    /**
     * 
     * @param {string} consentChallenge 
     * @param {boolean} [xApplicationRequesting] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConsentControllerApiInterface
     */
    consentControllerGetSlash(consentChallenge: string, xApplicationRequesting?: boolean, options?: any): AxiosPromise<object>;

    /**
     * 
     * @param {boolean} [xApplicationRequesting] 
     * @param {Body} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConsentControllerApiInterface
     */
    consentControllerPostSlash(xApplicationRequesting?: boolean, body?: Body, options?: any): AxiosPromise<object>;

}

/**
 * ConsentControllerApi - object-oriented interface
 * @export
 * @class ConsentControllerApi
 * @extends {BaseAPI}
 */
export class ConsentControllerApi extends BaseAPI implements ConsentControllerApiInterface {
    /**
     * 
     * @param {string} consentChallenge 
     * @param {boolean} [xApplicationRequesting] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConsentControllerApi
     */
    public consentControllerGetSlash(consentChallenge: string, xApplicationRequesting?: boolean, options?: any) {
        return ConsentControllerApiFp(this.configuration).consentControllerGetSlash(consentChallenge, xApplicationRequesting, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @param {boolean} [xApplicationRequesting] 
     * @param {Body} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConsentControllerApi
     */
    public consentControllerPostSlash(xApplicationRequesting?: boolean, body?: Body, options?: any) {
        return ConsentControllerApiFp(this.configuration).consentControllerPostSlash(xApplicationRequesting, body, options)(this.axios, this.basePath);
    }

}


/**
 * LoginControllerApi - axios parameter creator
 * @export
 */
export const LoginControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} loginChallenge 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginControllerGetSlash(loginChallenge: string, options: any = {}): RequestArgs {
            // verify required parameter 'loginChallenge' is not null or undefined
            if (loginChallenge === null || loginChallenge === undefined) {
                throw new RequiredError('loginChallenge','Required parameter loginChallenge was null or undefined when calling loginControllerGetSlash.');
            }
            const localVarPath = `/login`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (loginChallenge !== undefined) {
                localVarQueryParameter['login_challenge'] = loginChallenge;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {boolean} [xApplicationRequesting] 
         * @param {InlineObject} [inlineObject] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginControllerPostSlash(xApplicationRequesting?: boolean, inlineObject?: InlineObject, options: any = {}): RequestArgs {
            const localVarPath = `/login`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (xApplicationRequesting !== undefined && xApplicationRequesting !== null) {
                localVarHeaderParameter['x-application-requesting'] = String(JSON.stringify(xApplicationRequesting));
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof inlineObject !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(inlineObject !== undefined ? inlineObject : {}) : (inlineObject || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * LoginControllerApi - functional programming interface
 * @export
 */
export const LoginControllerApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} loginChallenge 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginControllerGetSlash(loginChallenge: string, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void> {
            const localVarAxiosArgs = LoginControllerApiAxiosParamCreator(configuration).loginControllerGetSlash(loginChallenge, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {boolean} [xApplicationRequesting] 
         * @param {InlineObject} [inlineObject] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginControllerPostSlash(xApplicationRequesting?: boolean, inlineObject?: InlineObject, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<object> {
            const localVarAxiosArgs = LoginControllerApiAxiosParamCreator(configuration).loginControllerPostSlash(xApplicationRequesting, inlineObject, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * LoginControllerApi - factory interface
 * @export
 */
export const LoginControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {string} loginChallenge 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginControllerGetSlash(loginChallenge: string, options?: any): AxiosPromise<void> {
            return LoginControllerApiFp(configuration).loginControllerGetSlash(loginChallenge, options)(axios, basePath);
        },
        /**
         * 
         * @param {boolean} [xApplicationRequesting] 
         * @param {InlineObject} [inlineObject] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginControllerPostSlash(xApplicationRequesting?: boolean, inlineObject?: InlineObject, options?: any): AxiosPromise<object> {
            return LoginControllerApiFp(configuration).loginControllerPostSlash(xApplicationRequesting, inlineObject, options)(axios, basePath);
        },
    };
};

/**
 * LoginControllerApi - interface
 * @export
 * @interface LoginControllerApi
 */
export interface LoginControllerApiInterface {
    /**
     * 
     * @param {string} loginChallenge 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoginControllerApiInterface
     */
    loginControllerGetSlash(loginChallenge: string, options?: any): AxiosPromise<void>;

    /**
     * 
     * @param {boolean} [xApplicationRequesting] 
     * @param {InlineObject} [inlineObject] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoginControllerApiInterface
     */
    loginControllerPostSlash(xApplicationRequesting?: boolean, inlineObject?: InlineObject, options?: any): AxiosPromise<object>;

}

/**
 * LoginControllerApi - object-oriented interface
 * @export
 * @class LoginControllerApi
 * @extends {BaseAPI}
 */
export class LoginControllerApi extends BaseAPI implements LoginControllerApiInterface {
    /**
     * 
     * @param {string} loginChallenge 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoginControllerApi
     */
    public loginControllerGetSlash(loginChallenge: string, options?: any) {
        return LoginControllerApiFp(this.configuration).loginControllerGetSlash(loginChallenge, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @param {boolean} [xApplicationRequesting] 
     * @param {InlineObject} [inlineObject] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoginControllerApi
     */
    public loginControllerPostSlash(xApplicationRequesting?: boolean, inlineObject?: InlineObject, options?: any) {
        return LoginControllerApiFp(this.configuration).loginControllerPostSlash(xApplicationRequesting, inlineObject, options)(this.axios, this.basePath);
    }

}


/**
 * LogoutControllerApi - axios parameter creator
 * @export
 */
export const LogoutControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} logoutChallenge 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logoutControllerGetSlash(logoutChallenge: string, options: any = {}): RequestArgs {
            // verify required parameter 'logoutChallenge' is not null or undefined
            if (logoutChallenge === null || logoutChallenge === undefined) {
                throw new RequiredError('logoutChallenge','Required parameter logoutChallenge was null or undefined when calling logoutControllerGetSlash.');
            }
            const localVarPath = `/logout`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (logoutChallenge !== undefined) {
                localVarQueryParameter['logout_challenge'] = logoutChallenge;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {InlineObject1} [inlineObject1] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logoutControllerPostSlash(inlineObject1?: InlineObject1, options: any = {}): RequestArgs {
            const localVarPath = `/logout`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof inlineObject1 !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(inlineObject1 !== undefined ? inlineObject1 : {}) : (inlineObject1 || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * LogoutControllerApi - functional programming interface
 * @export
 */
export const LogoutControllerApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} logoutChallenge 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logoutControllerGetSlash(logoutChallenge: string, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void> {
            const localVarAxiosArgs = LogoutControllerApiAxiosParamCreator(configuration).logoutControllerGetSlash(logoutChallenge, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {InlineObject1} [inlineObject1] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logoutControllerPostSlash(inlineObject1?: InlineObject1, options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void> {
            const localVarAxiosArgs = LogoutControllerApiAxiosParamCreator(configuration).logoutControllerPostSlash(inlineObject1, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * LogoutControllerApi - factory interface
 * @export
 */
export const LogoutControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {string} logoutChallenge 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logoutControllerGetSlash(logoutChallenge: string, options?: any): AxiosPromise<void> {
            return LogoutControllerApiFp(configuration).logoutControllerGetSlash(logoutChallenge, options)(axios, basePath);
        },
        /**
         * 
         * @param {InlineObject1} [inlineObject1] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logoutControllerPostSlash(inlineObject1?: InlineObject1, options?: any): AxiosPromise<void> {
            return LogoutControllerApiFp(configuration).logoutControllerPostSlash(inlineObject1, options)(axios, basePath);
        },
    };
};

/**
 * LogoutControllerApi - interface
 * @export
 * @interface LogoutControllerApi
 */
export interface LogoutControllerApiInterface {
    /**
     * 
     * @param {string} logoutChallenge 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogoutControllerApiInterface
     */
    logoutControllerGetSlash(logoutChallenge: string, options?: any): AxiosPromise<void>;

    /**
     * 
     * @param {InlineObject1} [inlineObject1] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogoutControllerApiInterface
     */
    logoutControllerPostSlash(inlineObject1?: InlineObject1, options?: any): AxiosPromise<void>;

}

/**
 * LogoutControllerApi - object-oriented interface
 * @export
 * @class LogoutControllerApi
 * @extends {BaseAPI}
 */
export class LogoutControllerApi extends BaseAPI implements LogoutControllerApiInterface {
    /**
     * 
     * @param {string} logoutChallenge 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogoutControllerApi
     */
    public logoutControllerGetSlash(logoutChallenge: string, options?: any) {
        return LogoutControllerApiFp(this.configuration).logoutControllerGetSlash(logoutChallenge, options)(this.axios, this.basePath);
    }

    /**
     * 
     * @param {InlineObject1} [inlineObject1] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LogoutControllerApi
     */
    public logoutControllerPostSlash(inlineObject1?: InlineObject1, options?: any) {
        return LogoutControllerApiFp(this.configuration).logoutControllerPostSlash(inlineObject1, options)(this.axios, this.basePath);
    }

}


/**
 * PingControllerApi - axios parameter creator
 * @export
 */
export const PingControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pingControllerPing(options: any = {}): RequestArgs {
            const localVarPath = `/ping`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PingControllerApi - functional programming interface
 * @export
 */
export const PingControllerApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pingControllerPing(options?: any): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<PingResponse> {
            const localVarAxiosArgs = PingControllerApiAxiosParamCreator(configuration).pingControllerPing(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * PingControllerApi - factory interface
 * @export
 */
export const PingControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pingControllerPing(options?: any): AxiosPromise<PingResponse> {
            return PingControllerApiFp(configuration).pingControllerPing(options)(axios, basePath);
        },
    };
};

/**
 * PingControllerApi - interface
 * @export
 * @interface PingControllerApi
 */
export interface PingControllerApiInterface {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PingControllerApiInterface
     */
    pingControllerPing(options?: any): AxiosPromise<PingResponse>;

}

/**
 * PingControllerApi - object-oriented interface
 * @export
 * @class PingControllerApi
 * @extends {BaseAPI}
 */
export class PingControllerApi extends BaseAPI implements PingControllerApiInterface {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PingControllerApi
     */
    public pingControllerPing(options?: any) {
        return PingControllerApiFp(this.configuration).pingControllerPing(options)(this.axios, this.basePath);
    }

}

