const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
 

app.post('/emoneynew', function (res) {




const https = require('https');
let username = 'pappiah';
let password = '@pappiah1';


let postData = JSON.stringify({
  
    'to' : res.phone,
    'body': 'Greetings AG User Prince Appiah Your Emoney Request Has Been Accepted Thank You!'
  });

  
let options = {
    hostname: 'api.bulksms.com',
    port: 443,
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
      'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    }
  };
  
  let req = https.request(options, (resp) => {
    console.log('statusCode:', resp.statusCode);
    let data = '';
      resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      console.log("Response:", data);
    });
  });
  
  req.on('error', (e) => {
    console.error(e);
  });
  
  req.write(postData);
  req.end();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);


})