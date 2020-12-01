const express = require('express');
const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const request = require('request');

app.prepare().then(() => {
  const server = express();

  function appendAPIHeaders(req, res) {
    const path = req.url.replace(/\/roamAPI/, '');
    let domain = '';

    switch (req.headers.host) {
      case 'localhost:3000':
      case '10.32.2.41': // beta-www.aircoolnet.com
      case 'beta-www.aircoolnet.com':
        domain = 'http://10.32.2.44'; // http://beta-api.aircoolnet.com
        break;
      case '10.31.2.41':
      case 'www.aircoolnet.com':
        domain = 'http://10.31.2.44'; // http://api.aircoolnet.com
        break;
      default:
        domain = 'http://10.32.2.44'; // http://beta-api.aircoolnet.com
    }

    let url = domain + path;
    console.log(new Date(), 'roamAPI---->:', url);
    req.pipe(request(url)).pipe(res); //指定response回傳的位置 回原本的路線上
  }

  function appendIdealAPIHeaders(req, res) {
    const path = req.url.replace(/\/idealAPI/, '/api');

    let domain = '';

    switch (req.headers.host) {
      case 'localhost:3000':
      case '10.32.2.41': // beta-www.aircoolnet.com
      case 'beta-www.aircoolnet.com':
        domain = 'https://beta-api.idealcard.com.tw'; 
        break;
      case '10.31.2.41':
      case 'www.aircoolnet.com':
        domain = 'https://new-api.idealcard.com.tw'; 
        break;
      default:
        domain = 'https://new-api.idealcard.com.tw'; 
    }

    let url = domain + path;
    console.log(new Date(), 'idealAPI---->:', url);
    req.pipe(request(url)).pipe(res); //指定response回傳的位置 回原本的路線上
  }

  server.all(/\/roamAPI\//, appendAPIHeaders);
  server.all(/\/idealAPI\//, appendIdealAPIHeaders);

  server.get('/service-worker.js', (req, res) => {
    const filePath = '.next/service-worke.js';
    app.serveStatic(req, res, filePath);
  });

  // check_alive.html
  server.get('/check_alive.html', (req, res) => {
    res.sendFile('./static/check_alive.html', { "root": __dirname });
  })

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
  });
});
