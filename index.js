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

app.get('/', (req, res) => {
  res.send("HI!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
