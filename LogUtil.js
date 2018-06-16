import { captureError, captureWarning } from "./SentryConfig";

/**
 * Hàm Log ra console
 * @param {string} funcName Tên hàm thực thi
 * @param {any} logText Nội dung log
 */
export const printLog = (funcName, logText) => {
  if (__DEV__) {
    console.log(funcName, logText);
  }
}

/**
 * Hàm show cảnh báo (WARNING) ra console
 * @param {string} funcName Tên hàm thực thi
 * @param {any} logText Nội dung log
 */
export const printWarn = (funcName, logText) => {
  if (__DEV__) {
    console.warn(funcName + ' ## WARNING', logText);
  } else {
    logText = typeof logText === 'object' ? JSON.stringify(logText) : logText;
    logText = funcName + ' ## ' + logText;
    captureWarning(logText);
  }
}

/**
 * Hàm show thông báo lỗi (ERROR) ra console
 * @param {string} funcName Tên hàm thực thi
 * @param {any} logText Nội dung log
 */
export const printError = (funcName, logText) => {
  if (__DEV__) {
    console.warn(funcName + ' ## ERROR', logText);
  } else {
    logText = typeof logText === 'object' ? JSON.stringify(logText) : logText;
    logText = funcName + ' ## ' + logText;
    captureError(logText);
  }
}