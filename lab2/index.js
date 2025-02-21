import http from 'http';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const server = http.createServer((req,res)=>{
    const {url , method} = req;

    if (url === '/' && method === 'GET'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        const filePath = path.join(__dirname, 'views', 'employees' , 'index.html');
        const readStream = fs.createReadStream(filePath);
        return readStream.pipe(res);
    }else if (url === '/api/employess' && method === 'GET'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const filePath = path.join(__dirname, '..' ,'lab1', 'data','data.json');
        const readStream = fs.createReadStream(filePath);
        return readStream.pipe(res);
    }else if (url === '/astronomy'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        const filePath = path.join(__dirname, 'views','astronomy','index.html')
        const readStream = fs.createReadStream(filePath);
        return readStream.pipe(res);
    }else if (url === '/fayoum.jpg'){
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        const filePath = path.join(__dirname, 'views', 'astronomy','fayoum.jpg');
        const readStream = fs.createReadStream(filePath);
        return readStream.pipe(res);
    }else if (url === '/serbal'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        const filePath = path.join(__dirname, 'views','serbal','index.html')
        const readStream = fs.createReadStream(filePath);
        return readStream.pipe(res);
    }else if (url === '/serbal.jpg'){
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        const filePath = path.join(__dirname, 'views', 'serbal','serbal.jpg');
        const readStream = fs.createReadStream(filePath);
        return readStream.pipe(res);
    }else if (url.match(/\.(css|js)$/)){
        const filePath = path.join(__dirname,  'views', 'employees' , url);
        const readStream = fs.createReadStream(filePath);
        const contentType = url.endsWith('.css')? 'text/css' : 'text/javascript';
        res.writeHead(200, {'Content-Type': contentType});
         readStream.pipe(res);
         return;
    }else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        const filePath = path.join(__dirname, 'views', 'errorPage', 'index.html');
        const readStream = fs.createReadStream(filePath);
        return readStream.pipe(res);
    }

  

})

const PORT = 3000;

server.listen(PORT, ()=>{
    console.log("The server is up and running at localhost:3000");
})





