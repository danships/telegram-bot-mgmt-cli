# Telegram Bot CLI

A command-line interface (CLI) tool to manage and configure your Telegram bot using the `node-telegram-bot-api` library. This tool allows to perform some
basic operations like sending messages, setting commands, and more from the command-line.

Looking for more useful tools, inspiration, and insights on side projects and JavaScript development? Check out my podcast and blog at [Debugging Dan](https://www.debuggingdan.com)!

## Running

The tool can be run simply by using `npx telegram-bot-mgmt-cli`:

```bash
user@host:~ npx telegram-bot-mgmt-cli

Usage: telegram-bot-mgmt-cli [options] [command]

Options:
  -t, --token <token>    Telegram bot token, acquired from BotFather, can also be set as TELEGRAM_BOT_TOKEN environment variable
  -u, --url <url>        Bot Server, optional URL if the bot is running on a local bot server, TELEGRAM_SERVER_URL via env var.
  -h, --help             display help for command

Commands:
  logout                 Logout the bot from the server. This is required when moving a bot to a different bot server. See https://core.telegram.org/bots/api#logout
  me|info                Get information about the bot
  set-webhook [options]  Set the bot webhook URL
  get-webhook-info       Get the current webhook configuration
  del-webhook            Delete the current webhook configuration
  poll                   Poll for a message, this will remove a webhook configuration if it is set.
  send [options]         Send a message to a chat
  help [command]         display help for command
```

## Configuration

There are two global variables that can be set for each command:

- the bot token, either provided it via `-t, --token` option or setting it as `TELEGRAM_BOT_TOKEN` environment variable. This value is required for all commands.
- the bot server URL, either provided it via `-u, --url` option or setting it as `TELEGRAM_SERVER_URL` environment variable. This value is optional and only required when the bot is running on a [local server](https://core.telegram.org/bots/api#using-a-local-bot-api-server).

Some commands have some additonal configuration options, which can be viewed by running `telegram-bot-mgmt-cli help <command>`.

## Operations

The following operations are supported:

- **Logout**: Logout the bot from the server. This is required when moving a bot to a different bot server. See [Logout](https://core.telegram.org/bots/api#logout)
- **Info**: Get information about the bot. See [GetMe](https://core.telegram.org/bots/api#getme).
- **Set Webhook**: Set the bot webhook URL. See [SetWebhook](https://core.telegram.org/bots/api#setwebhook).
- **Get Webhook Info**: Get the current webhook configuration. See [GetWebhookInfo](https://core.telegram.org/bots/api#getwebhookinfo).
- **Delete Webhook**: Delete the current webhook configuration. See [DeleteWebhook](https://core.telegram.org/bots/api#deletewebhook).
- **Poll**: Poll for a message, this will remove a webhook configuration if it is set. This will allow you to see a sample update, to determine the conversationId for example. See [GetUpdates](https://core.telegram.org/bots/api#getupdates).
- **Send**: Send a message to a chat. Only a text message is supported currently.

# Attributions

Based on the awesome `node-telegram-bot-api` library by [yagop](https://github.com/yagop/node-telegram-bot-api).
