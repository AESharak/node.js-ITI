import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
  const {url, method} = req;

  if (url === '/' && method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const filePath = path.join(__dirname, 'views', 'employees', 'index.html');
    const readStream = fs.createReadStream(filePath);
    return readStream.pipe(res);
  } else if (url === '/api/employess' && method === 'GET') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    const filePath = path.join(__dirname, '..', 'lab1', 'data', 'data.json');
    const readStream = fs.createReadStream(filePath);
    return readStream.pipe(res);
  } else if (url === '/astronomy') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const filePath = path.join(__dirname, 'views', 'astronomy', 'index.html');
    const readStream = fs.createReadStream(filePath);
    return readStream.pipe(res);
  } else if (url === '/fayoum.jpg') {
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    const filePath = path.join(__dirname, 'assets', 'images', 'fayoum.jpg');
    const readStream = fs.createReadStream(filePath);
    return readStream.pipe(res);
  } else if (url === '/astronomy/download') {
    res.writeHead(200, {'Content-Type': 'image/jpeg', 'Content-Disposition': 'attachment; filename="fayoum.jpg"'});
    const filePath = path.join(__dirname, 'assets', 'images', 'fayoum.jpg');
    const readStream = fs.createReadStream(filePath);
    return readStream.pipe(res);
  } else if (url === '/serbal') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const filePath = path.join(__dirname, 'views', 'serbal', 'index.html');
    const readStream = fs.createReadStream(filePath);
    return readStream.pipe(res);
  } else if (url === '/serbal.jpg') {
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    const filePath = path.join(__dirname, 'assets', 'images', 'serbal.jpg');
    const readStream = fs.createReadStream(filePath);
    return readStream.pipe(res);
  } else if (url === '/employee') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const filePath = path.join(__dirname, 'views', 'employees', 'addEmployee.html');
    const readStream = fs.createReadStream(filePath);
    return readStream.pipe(res);
  } else if (url.match(/\.(css|js)$/)) {
    const filePath = path.join(__dirname, 'assets', url);
    const readStream = fs.createReadStream(filePath);
    const contentType = url.endsWith('.css') ? 'text/css' : 'text/javascript';
    res.writeHead(200, {'Content-Type': contentType});
    readStream.pipe(res);
  } else if (url === '/api/employees' && method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const formData = JSON.parse(body);
        const counterPath = path.join(__dirname, '..', 'lab1', 'data', 'counter.json');
        const counter = JSON.parse(fs.readFileSync(counterPath, 'utf-8'));

        const employee = {
          id: ++counter.currentCounter,
          name: formData.name,
          email: formData.email,
          salary: Number(formData.salary),
          level: (formData.level || 'jr').toLowerCase(),
          yearsOfExperience: Number(formData.yearsOfExperience) || 0
        };

        if (!employee.name || !employee.email || !employee.salary) {
          throw new Error('Name, email and salary are required fields');
        }

        const levelsChoices = ['jr', 'mid-level', 'sr', 'lead'];
        if (!levelsChoices.includes(employee.level)) {
          employee.level = 'jr';
        }

        if (employee.yearsOfExperience < 0) {
          employee.yearsOfExperience = 0;
        }

        if (Number.isNaN(employee.salary)) {
          throw new TypeError('Salary must be a number');
        }

        const filePath = path.join(__dirname, '..', 'lab1', 'data', 'data.json');

        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: 'Failed to read data file'}));
            return;
          }

          const employees = JSON.parse(data);
          employees.push(employee);

          Promise.all([
            fs.promises.writeFile(filePath, JSON.stringify(employees, null, 2)),
            fs.promises.writeFile(counterPath, JSON.stringify(counter))
          ]).then(() => {
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
              message: 'Employee added successfully',
              employee
            }));
          }).catch((err) => {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: 'Failed to write data'}));
            console.error(err);
          });
        });
      } catch (error) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
          error: error.message || 'Invalid employee data'
        }));
        console.error(error);
      }
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    const filePath = path.join(__dirname, 'views', 'errorPage', 'index.html');
    const readStream = fs.createReadStream(filePath);
    return readStream.pipe(res);
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log('The server is up and running at localhost:3000');
});
