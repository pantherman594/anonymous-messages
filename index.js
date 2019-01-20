const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log(req.body);
  res.status(200).send('');
  axios.post(req.body.response_url, {
    response_type: "in_channel",
    text: req.body.text,
  });
});

app.get('/oauth', (req, res) => {
  res.send("Anonymous Messages has been activated.");
});

app.get('/', (req, res) => {
  res.send("To install Anonymous Messages, go to https://slack.com/oauth/authorize?client_id=3291865129.529288519095&scope=commands");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
