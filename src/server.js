const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;
const discos = require('./discos.json');
// console.log(discos);

//middleware
app.use(express.static(path.join(__dirname,'client')));

//endpoints - routes
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'client/klk.html'));
});
app.get('/disco', function (req, res) {
  console.log(req.query);
  res.send('hi my name is gabriel');
});

//server
app.listen(PORT, function () {
  console.log(`server on, PORT ${PORT}`);
});
