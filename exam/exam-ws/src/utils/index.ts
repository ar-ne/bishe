export const clog: Logger = (message?: any, ...optionalParams: any[]) => {
  console.log(message, optionalParams.length == 0 ? '' : optionalParams);
};

export const loggerFactory = (tag: string): Logger => {
  return (message?: any, ...optionalParams: any[]) => {
    console.log(tag, message, optionalParams.length == 0 ? '' : optionalParams);
  };
};

export const cookieParser = (cookie: string) => {
  try {
    const output: { [key: string]: string } = {};
    cookie.split(/\s*;\s*/).forEach(function(pair) {
      const pairs = pair.split(/\s*=\s*/);
      output[pairs[0]] = pairs.splice(1).join('=');
    });
    return output;
  } catch (e) {
    return undefined;
  }
};

export const strWithPrefixFactory = (prefix: string) => (str: string = '') => prefix + str;

export type Logger = (message?: any, ...optionalParams: any[]) => void;