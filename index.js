const axios = require('axios')
const express = require('express')
const app = express();

app.post('/', (req, res) => {
  res.json({
    response_type: "in_channel",
    text: "ASDF",
  });
});

app.listen(80, () => {
  console.log("Listening on port 80...");
});
