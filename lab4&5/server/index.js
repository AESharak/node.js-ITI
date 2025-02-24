import process from 'node:process';
import cors from 'cors';
import express from 'express';
import connectDB from './config/database.js';
import errorHandler from './middlewares/error.middleware.js';
import employeeRoutes from './routes/employee.route.js';
import leaveRoutes from './routes/leave.route.js';

const app = express();

const corsOptions = {
  origin: 'http://127.0.0.1:8080',
  methods: ['GET'],
  optionsSuccessStatus: 200
};

connectDB();

app.use(cors(corsOptions));
app.use(express.json());

app.use(cors());
app.use(express.json());
app.use(express.static('client'));

app.use('/employees', employeeRoutes);
app.use('/leaves', leaveRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
