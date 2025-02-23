import path from 'node:path';
import {fileURLToPath} from 'node:url';
import express from 'express';
import employeeRouters from './routes/employees.route.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', 'views');

app.use('/employees', employeeRouters);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('The Server is up and running at localhost:3000');
});
