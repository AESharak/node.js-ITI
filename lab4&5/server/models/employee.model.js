import {AutoIncrementID} from '@typegoose/auto-increment';
import mongoose from 'mongoose';
import profileSchema from './profile.schema.js';

const employeeSchema = new mongoose.Schema({
  _id: Number,
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minLength: [8, 'Username must be at least 8 characters long'],
    validate: {
      validator: (v) => !v.includes(' '),
      message: 'Username cannot contain spaces'
    }
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minLength: [3, 'First name must be at least 3 characters long'],
    maxLength: [15, 'First name cannot exceed 15 characters'],
    validate: {
      validator: (v) => v.charAt(0) === v.charAt(0).toUpperCase(),
      message: 'First name must be capitalized'
    }
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minLength: [3, 'Last name must be at least 3 characters long'],
    maxLength: [15, 'Last name cannot exceed 15 characters'],
    validate: {
      validator: (v) => v.charAt(0) === v.charAt(0).toUpperCase(),
      message: 'Last name must be capitalized'
    }
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [8, 'Password must be at least 8 characters long']
  },
  profile: {
    type: profileSchema,
    required: [true, 'Profile is required']
  }
}, {
  timestamps: true,
  _id: false,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

employeeSchema.virtual('age').get(function () {
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

employeeSchema.plugin(AutoIncrementID, {});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
