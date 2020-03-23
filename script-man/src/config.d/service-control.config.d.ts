export default interface ServiceConfig {
  name: string;
  type: string;
  options: { [key: string]: any };
}

