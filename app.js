module.exports = function (port) {
  if (!port) {
    port = 8080;
  }
  const app = require("express")();
  const http = require("http").Server(app);
  const fs = require('fs');

  const base = "./store";

  try {
    fs.statSync(base);
  } catch (e) {
    fs.mkdirSync(base);
  }

  // /database/?q=pp5 l1l
  // /database/?key=pp5 l1l&value={}
  app.get("/database/*", (req,res) => {
    if (req.query.q) {
      var q = req.query.q;
      var query = base+"/"+q.split("").join("/")+"/data.json";
      fs.readFile(query, (err, data) => {
        if (err) {
          res.end("{error: 'value doesn\'t exist'}");
        } else {
          res.end(data);
        }
      });
    } else if (req.query.key && req.query.value) {
      var key = req.query.key;
      var value = req.query.value;
      try {
        fs.statSync(base+"/"+key.split("").join("/"))
      } catch (e) {
        var err = true;
      }
      if (err && req.query.overwrite != "true") {
        res.end("{error: 'file exists, overwrite with &overwrite=true'}")
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
            res.end("{err: "+err+"}");
          } else {
            res.end("{sucess: true}");
          }
        });
      }
    }
  });

  http.listen(port, ()=>{
    console.log('MeagaQuery is running');
  });
}
