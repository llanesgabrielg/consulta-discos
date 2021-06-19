const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;
//tengo un JSON
let disks = require("./discos.json");
//convierto a string y luego a objeto
let strDisks = JSON.stringify(disks);
let parseDisks = JSON.parse(strDisks);
const vecDisks = parseDisks.discos;

//middleware
app.use(express.static(path.join(__dirname, "client")));

//endpoints - routes

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client/klk.html"));
});

app.get("/disco", function (req, res) {
  //datos que llegan de un request
  console.log(req.query); // tengo un objeto en el query
  let resultFilter = vecDisks;
  const reqTitle = req.query.title;
  const reqArtist = req.query.artist;
  const reqRelease = req.query.release;
  //validacion y filtro de datos obtenidos para enviar una respuesta
  if (reqTitle) {
    resultFilter = resultFilter.filter(function (disk) {
      if (disk.titulo.toLowerCase().includes(reqTitle.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
  }
  if (reqArtist) {
    resultFilter = resultFilter.filter(function (disk) {
      if (disk.artista.toLowerCase().includes(reqArtist.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
  }
  if (reqRelease) {
    resultFilter = resultFilter.filter(function (disk) {
      if (disk.lanzamiento === parseInt(reqRelease)) {
        return true;
      } else {
        return false;
      }
    });
  }
  console.log(resultFilter);
  res.json(resultFilter);
});

//server
app.listen(PORT, function () {
  console.log(`server on, PORT ${PORT}`);
});
