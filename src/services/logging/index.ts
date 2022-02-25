export interface ILogger {
  info(...args: any[]): any;
  error(...args: any[]): any;
}

const consoleAdapter: ILogger = {
  info: console.log,
  error: console.error,
};

const logger = consoleAdapter;
export default logger;
