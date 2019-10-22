const net = require('net');
const fs = require('fs');

const filename = "hello.txt";

const conn = net.createConnection({ 
  host: 'localhost', // change to IP address
  port: 3000
});

conn.setEncoding('utf8'); // interpret data as text

conn.on('data', (data) => {
  if (data !== "I don't have the file"){
    fs.writeFile(`./${filename}`, data, function (err) {
      if (err) throw err;
      console.log(`Downloaded and saved ${fs.statSync(`./${filename}`).size} bytes to ${filename}`);
      process.exit();
    });
  } else {
    console.log(data);
    process.exit();
  }  
});

conn.on('connect', () => {
  //conn.write('Hello from client!');
  conn.write(filename);
});