import process from 'node:process';
import mongoose from 'mongoose';

const connectDB = () => {
  try {
    mongoose.connect('mongodb://localhost:27017/lab4_employee_leaves');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
