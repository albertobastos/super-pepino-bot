SuperPepinoBot

A just-for-fun Telegram Bot who listens to all messages within a chat or group and replies -usually in a rude way- those that match any of the pre-established rules.

If you speak Spanish, haven't you heard the expression: "¿5? ¡Por el culo te la hinco!". Well, that is what this bot does.

Implemented with Node.js and mantained with the Serverless Framework so configuration and deploys at the AWS Lambda and AWS API Gateway services can be automatized.

Some very ill-organized instructions:

- Use serverless commands to login and configure your AWS credentials.
- Go to Telegram's BotFather, create a bot and write down your new bot token.
- Create both config.js and rules.js files using the .sample.js available as a template. Fill the config.token attribute with your own.
- Edit rules.js to add your own rules. Some inline comments there can give you a hint on how to do that.
- Use testRules.js and "yarn run test" to test your rule matches.
- Execute "yarn run deploy" to update your service at AWS (development stage).
- Execute "yarn run deploy-prod" to update your service at AWS (production stage, be careful!).
- Use config.webhook and "yarn run set-hook" to update your bot's webhook URL with the one returned by serverless after each deploy.