const axios = require('axios');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;
const TOKENS_FILE = 'tokens.json';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let rawTokenData;
try {
  rawTokenData = fs.readFileSync(TOKENS_FILE);
} catch(err) {
  rawTokenData = '{}';
}
const authTokens = JSON.parse(rawTokenData);

app.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).send('');
  axios.post(req.body.response_url, {
    response_type: "in_channel",
    text: req.body.text,
  });
});

app.get('/oauth', (req, res) => {
  const code = req.query.code;

  if (!code) {
    res.send("Installation has been cancelled.");
    return;
  }

  axios.get('https://slack.com/api/oauth.access', {
    params: {
      client_id: process.env.SLACK_ID,
      client_secret: process.env.SLACK_SECRET,
      code: code,
    }
  }).then(authRes => {
    const token = authRes.access_token;
    const id = authRes.team_id;

    authTokens[id] = token;
    fs.writeFileSync(TOKENS_FILE, JSON.stringify(authTokens));
  });
  res.send("Anonymous Messages has been activated.");
});

app.get('/', (req, res) => {
  res.send("To install Anonymous Messages, go to https://slack.com/oauth/authorize?client_id=3291865129.529288519095&scope=commands");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
