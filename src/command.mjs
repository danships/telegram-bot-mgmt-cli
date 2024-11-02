'use strict';
import { Command } from 'commander';
import chalk from 'chalk';
import { getBotOptions, errorWrapper } from './utils.mjs';
import TelegramBot from 'node-telegram-bot-api';

const program = new Command()
  .option(
    '-t, --token <token>',
    'Telegram bot token, acquired from BotFather, can also be set as TELEGRAM_BOT_TOKEN environment variable'
  )
  .option(
    '-u, --url <url>',
    'Bot Server, optional URL if the bot is running on a local bot server, TELEGRAM_SERVER_URL via env var.'
  );

program
  .command('logout')
  .description(
    'Logout the bot from the server. This is required when moving a bot to a different bot server. See https://core.telegram.org/bots/api#logout'
  )
  .action(
    errorWrapper(async () => {
      const { token, options } = getBotOptions(program.opts());

      const bot = new TelegramBot(token, options);
      await bot.logOut();
      console.log(
        chalk.green(
          'Bot is succesfully logged out. You can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes.'
        )
      );
    })
  );

program
  .command('me')
  .alias('info')
  .description('Get information about the bot')
  .action(
    errorWrapper(async () => {
      const { token, options } = getBotOptions(program.opts());

      const bot = new TelegramBot(token, options);
      const me = await bot.getMe();
      console.log(me);
    })
  );

program
  .command('set-webhook')
  .description('Set the bot webhook URL')
  .requiredOption(
    '-w, --webhook <webhook>',
    'Use this method to specify a URL and receive incoming updates via an outgoing webhook.'
  )
  .action(
    errorWrapper(async function (commandOptions) {
      const { token, options } = getBotOptions(commandOptions);
      const { webhook } = commandOptions;

      const bot = new TelegramBot(token, options);
      await bot.setWebHook(webhook);
      console.log(chalk.green(`Webhook delivery URL set to ${webhook}`));
    })
  );

program
  .command('get-webhook')
  .description('View the configuration webhook information for a bot')
  .action(
    errorWrapper(async function (commandOptions) {
      const { token, options } = getBotOptions(commandOptions);

      const bot = new TelegramBot(token, options);
      const result = await bot.getWebHookInfo();
      console.log(chalk.green(JSON.stringify(result, null, 2)));
    })
  );

program
  .command('del-webhook')
  .description('Remove the configured webhook URL for a bot')
  .action(
    errorWrapper(async function (commandOptions) {
      const { token, options } = getBotOptions(commandOptions);

      const bot = new TelegramBot(token, options);
      const result = await bot.deleteWebHook();
      console.log('The webhook information has been removed.');
    })
  );

program
  .command('poll')
  .description('Poll for a message, this will remove a webhook configuration if it is set.')
  .action(
    errorWrapper(async () => {
      const { token, options } = getBotOptions(program.opts());

      console.log(chalk.white('Polling for messages... Interrupt with Ctrl+C to stop.'));
      const bot = new TelegramBot(token, { ...options, polling: true });
      bot.on('message', (msg) => {
        console.log('Received message.');
        console.log(chalk.green(JSON.stringify(msg, null, 2)));
        bot.stopPolling();
      });
    })
  );

program
  .command('send')
  .description('Send a message to a chat')
  .requiredOption('-c, --chat <chat>', 'Chat ID to send the message to.')
  .requiredOption('-m, --message <message>', 'The message to send.')
  .action(
    errorWrapper(async function (commandOptions) {
      const { token, options } = getBotOptions(commandOptions);
      const { chat, message } = commandOptions;

      const bot = new TelegramBot(token, { ...options });
      const reply = await bot.sendMessage(chat, message);
      console.log(chalk.green(`Message sent! 📨 (msg id: ${reply.message_id})`));
    })
  );

program.parse(process.argv);
