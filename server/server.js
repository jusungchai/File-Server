const net = require('net');
const fs = require('fs');

const sendFile = function (path, client) {
  if (fs.existsSync(path)) {
    openFile(path, (fileData) => {
      client.write(fileData);
    });    
  } else {
    client.write("I don't have the file");
  }
}

const openFile = function (path, callback) {
  fs.readFile(path, 'utf8', (error, data) => {
    if (!error) callback(data);
    else callback(undefined);
  });
}


const server = net.createServer();

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});

let filePath = "./";

server.on('connection', (client) => {
  console.log('New client connected!');
  //client.write('Hello there!');
  client.setEncoding('utf8'); // interpret data as text
  client.on('data', (data) => {
    console.log('Message from client: ', data)
    if (data.split(".")[1] === "txt") {
      filePath += data;
      console.log(filePath);
      sendFile(filePath, client);
      filePath = "./";
    }
  });
});