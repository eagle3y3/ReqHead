const express = require("express");
const bodyParser =require("body-parser");
const cors = require("cors");
const useragent = require("express-useragent")
const app = module.exports = express();

const portNumber = process.env.PORT || '5000';

const api = "/api/whoami"

app.use(bodyParser.json());
app.use(cors());
app.use(useragent.express());
app.use('/public', express.static('public'));

app.listen(portNumber, () => {
  console.log(`we live at port: ${portNumber}!`)
})

app.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: __dirname });
});

app.get(api, (req, res, next) => {
  var language = req.acceptsLanguages();
  var software = "OS: " + req.useragent.os + ", Browswer: " + req.useragent.browser;
  var ipaddress = req.ip;

  res.json({'ipaddress' : ipaddress, 'language': language[0], 'software' : software })
})
