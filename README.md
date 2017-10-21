SuperPepinoBot is a Telegram Bot implemented to run as an AWS Lambda Function.

It replies to chat messages that match any of the configured suffixes.

Just for fun!

It is recommended to use yarn instead of npm to avoid problems with the dependency mess Node.js is nowadays.

Remember to create your own config.local.js file before running anything!

npm commands:
- setWebhook: configures the Telegram BOT to use the configured AWS API Gateway webhook.
- expressions: runs a basic test for the configured suffixes.
- test: runs a basic test for the bot (it will fail anyway because of the invalid chat ID).
- zip: creates a dist/SuperPepinoBot.zip ready to upload as an AWS Lambda funcion.