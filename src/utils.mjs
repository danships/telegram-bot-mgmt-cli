'use strict';
import chalk from 'chalk';

export function getBotOptions(commandOptions) {
  const token = commandOptions.token || process.env.TELEGRAM_BOT_TOKEN;
  const serverUrl = commandOptions.url || process.env.TELEGRAM_SERVER_URL;

  if (!token) {
    console.error(
      chalk.red(
        'Bot token is required. Provide one via the --token option or the TELEGRAM_BOT_TOKEN environment variable.'
      )
    );
    process.exit(1);
  }

  const telegramOptions = { polling: false };
  if (serverUrl) {
    telegramOptions.baseApiUrl = serverUrl;
  }
  return { token, options: telegramOptions };
}

export const errorWrapper = (fn) => {
  return async function (...args) {
    try {
      return await fn.call(null, ...args);
    } catch (error) {
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  };
};
