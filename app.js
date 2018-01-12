const app = require("express")();
const fs = require('fs');

const base = "./store";

try {
  fs.statSync(base);
} catch (e) {
  fs.mkdirSync(base);
}

function startServer(port) {
  const http = require("http").Server(app);
  if (!port) {
    port = 8080;
  }
  // /database/?q=pp5 l1l
  // /database/?key=pp5 l1l&value={}
  app.get("/database/*", (req,res) => {
    database(req.query, (data) => {
      res.end(data);
    });
  });

  http.listen(port, ()=>{
    console.log('MeagaQuery is running');
  });
}

exports.startServer = startServer;
exports = database;


function database(query, cb) {
  if (query.q) {
    var q = query.q;
    var query = base+"/"+q.split("").join("/")+"/data.json";
    fs.readFile(query, (err, data) => {
      if (err) {
        cb("{error: 'value doesn\'t exist'}");
      } else {
        cb(data);
      }
    });
  } else if (query.key && query.value) {
    var key = query.key;
    var value = query.value;
    try {
      fs.statSync(base+"/"+key.split("").join("/"))
    } catch (e) {
      var err = true;
    }
    if (!err && query.overwrite != "true") {
      cb("{error: 'file exists, overwrite with &overwrite=true'}");
    } else {
      for (var i = 1; i < key.length+1; i++) {
        var path = base+"/"+key.slice(0,i).split("").join("/");
        try {
          fs.statSync(path);
        } catch (e) {
          fs.mkdirSync(path);
        }
      }
      fs.writeFile(path+"/data.json",value, (err) => {
        if (err) {
          cb("{err: "+err+"}");
        } else {
          cb("{sucess: true}");
        }
      });
    }
  }
}
