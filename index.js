const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
// heroku will set the port.
const PORT = process.env.PORT || 5000;

// setup parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  res.status(200).send('');

  // Post to response_url instead of directly replying, to hide the command
  axios.post(req.body.response_url, {
    response_type: 'in_channel',
    text: req.body.text,
  });
});

app.get('/oauth', (req, res) => {
  const code = req.query.code;

  if (!code) {
    res.send('Installation has been cancelled.');
    return;
  }

  axios.get('https://slack.com/api/oauth.access', {
    // slack app id and secret are configured in heroku
    params: {
      client_id: process.env.SLACK_ID,
      client_secret: process.env.SLACK_SECRET,
      code: code,
    }
  });
  res.send('Anonymous Messages has been activated. You may close this tab.');
});

app.get('/', (req, res) => {
  res.send('To install Anonymous Messages, click <a href="https://slack.com/oauth/authorize?client_id=3291865129.529288519095&scope=commands">here</a>.<br /><a href="https://github.com/pantherman594/anonymous-messages">Source</a>');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
