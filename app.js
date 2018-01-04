const app = require("express")();
const http = require("http").Server(app);
const fs = require('fs');

const base = "./store";

// /database/q=pp5 l1l
// /database/key=pp5 l1l&value={}
app.get("/database/*", (req,res) => {
  if (req.query.q) {
    var q = req.query.q;
    for (var i = 0; i < q.length; i++) {
      res.end("{error: 'query not passible'}");
    }
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
    if (!req.query.overwrite) {
      var s = fs.statSync(base+"/"+key.split("").join("/"));
      if (s.dev) {
        res.end("{error: 'file exists, overwrite with &overwrite=true'}")
      }
    }
    for (var i = 1; i < key.length+1; i++) {
      var path = base+"/"+key.slice(0,i).split("").join("/");
      try {
        var s = fs.statSync(path);
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
});

http.listen(8080, ()=>{
  console.log('Running on http://localhost:8080');
});
