export const parse = (cookie: string) => {
  const output: { [key: string]: string } = {};
  cookie.split(/\s*;\s*/).forEach(function(pair) {
    const pairs = pair.split(/\s*=\s*/);
    output[pairs[0]] = pairs.splice(1).join('=');
  });
  return output;
};
