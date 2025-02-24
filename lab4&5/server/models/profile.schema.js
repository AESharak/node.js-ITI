import mongoose from 'mongoose';
import validator from 'validator';

const profileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  yearOfExperience: {
    type: Number,
    default: 0
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [validator.isEmail, 'Please provide a valid email']
  }
}, {_id: false});

export default profileSchema;
