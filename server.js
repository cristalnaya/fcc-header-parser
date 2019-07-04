// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const useragent = require('express-useragent');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(useragent.express());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

app.get('/api/whoami', (req, res) => {
  const ip = req.ip;
  const language = req.acceptsLanguages()[0];
  const software = `${req.useragent.source}, ${req.useragent.browser}, ${req.useragent.os}, $`;
  res.json({ 
    "ip": ip,
    "language": language,
    "software": software
   });
})

// listen for requests :)
const listener = app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
