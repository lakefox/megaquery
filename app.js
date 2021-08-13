const app = require("express")();
const fs = require('fs');
const execFile = require('child_process').execFile;

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
exports.api = database;


async function database(query) {
  if (query.q) {
    var q = query.q;
    var query = base+"/"+q.split("").join("/")+"/data.json";
    return new Promise(function (resolve, reject) {
      fs.readFile(query, (err, data) => {
        if (err) {
          resolve(`{"error": "value doesn't exist"}`);
        } else {
          resolve(data.toString());
        }
      });
    });
  } else if (query.scan != undefined) {
    return new Promise(function (resolve, reject) {
      execFile('find', [base], function(err, stdout, stderr) {
        var fileList = stdout.replace(new RegExp(base, "g"),"").replace(/\//g, "").split('\n');
        fileList = fileList.filter((a) => {
          return a.indexOf("data.json") != -1;
        });
        fileList = fileList.join("\n").replace(/data.json/g, "").split("\n");
        if (query.scan != "") {
          fileList = fileList.filter((a) => {
            return a.toLowerCase().indexOf(encodeURIComponent(query.scan).toLowerCase()) != -1;
          });
        }
        resolve(fileList);
      });
    });
  } else if (query.key && query.value) {
    var key = query.key;
    var value = query.value;
    try {
      await fs.statSync(base+"/"+key.split("").join("/"))
    } catch (e) {
      var err = true;
    }
    if (!err && query.overwrite != "true") {
      return '{"error": "file exists, overwrite with &overwrite=true"}';
    } else {
      for (var i = 1; i < key.length+1; i++) {
        var path = base+"/"+key.slice(0,i).split("").join("/");
        try {
          await fs.statSync(path);
        } catch (e) {
          await fs.mkdirSync(path);
        }
      }
      var err = await fs.writeFile(path+"/data.json",value, (err) => {

      });
      if (err) {
        return '{"err": '+err+"}";
      } else {
        return '{"sucess": true}';
      }
    }
  }
}
