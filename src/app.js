const { App } = require("@slack/bolt");
const { checkText } = require('./services/grammarService');
require('dotenv').config();
const app = new App({
    token: process.env.SLACK_TOKEN,
    signingSecret: process.env.SLACK_SIGNIN,
    socketMode:true,
    appToken: process.env.SLACK_AUTH_TOKEN
});

app.message(async ({ message, say}) => {
  const isTextCorrect = await checkText(message.text);
  if(isTextCorrect === undefined){
    await say({text:'An error occured, please contact an administrator.',thread_ts:message.event_ts});
  } else {
    if(isTextCorrect){
    await app.client.reactions.add({
      name: 'white_check_mark',
      timestamp: message.ts,
      channel: message.channel
    });
  } else {
    await app.client.reactions.add({
      name: 'x',
      timestamp: message.ts,
      channel: message.channel
    });
  }
  }
});

app.start(3000)