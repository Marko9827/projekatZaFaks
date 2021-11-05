var express = require("express"),
app = express(),
open = require("open"),
path = require("path"),
port = process.env.PORT || 8080;
app.get("/app/", function (req, res) {
    //   res.sendFile(path.join(__dirname, "/index.html"));
    res.sendFile(path.join(__dirname, "/app/index.html"));
    console.log(req.url);
});
app.get("/", function (req, res) {
    //   res.sendFile(path.join(__dirname, "/index.html"));
    res.sendFile(path.join(__dirname, "/index.html"));
    console.log(req.url);
});
app.get("*",function(req,res){
 //   res.sendFile(path.join(__dirname, "/index.html"));
 res.sendFile(path.join(__dirname,req.url));  
 console.log(req.url);
});
 

app.use(express.static("app"));
app.listen(port,function(){
    var lg = "",
        url = "http://localhost:" + port;
    open(url);
    console.log(url);
});
