var WebSocketServer = require('ws').Server
, wss = new WebSocketServer({ port: 8080 }); // If you want to add a path as well, use path: "PathName"
const kick="steap";
const fs = require('fs');
var streamGravData = fs.createWriteStream(kick+"grav.csv", {flags:'a'});
var streamGyroData = fs.createWriteStream(kick+"gyro.csv", {flags:'a'});
var streamAccData = fs.createWriteStream(kick+"acc.csv", {flags:'a'});
var streamLAccData = fs.createWriteStream(kick+"lacc.csv", {flags:'a'});
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    var jsonObj=JSON.parse(message);
    if(jsonObj.type==='grav'){
       // console.log('grav received')
        streamGravData.write(jsonObj.data.x+","+jsonObj.data.y+","+jsonObj.data.z+"\n")
    }
    if(jsonObj.type==='gyro'){
      //console.log('gyro received');
      streamGyroData.write(jsonObj.data.x+","+jsonObj.data.y+","+jsonObj.data.z+"\n")
    }
    if(jsonObj.type==='acc'){
      //console.log('acc received');
      streamAccData.write(jsonObj.data.x+","+jsonObj.data.y+","+jsonObj.data.z+"\n")
    }
    if(jsonObj.type==='lacc'){
      console.log('lacc received');
      streamLAccData.write(jsonObj.data.x+","+jsonObj.data.y+","+jsonObj.data.z+"\n")
    }
  });
});

