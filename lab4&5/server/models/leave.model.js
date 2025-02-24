import mongoose from 'mongoose';
import mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const leaveSchema = new mongoose.Schema({
  _id: Number,
  empId: {
    type: Number,
    required: [true, 'Employee ID is required']
  },
  type: {
    type: String,
    required: [true, 'Leave type is required'],
    enum: ['annual', 'casual', 'sick']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    validate: {
      validator(v) {
        return v > 0;
      },
      message: 'Duration must be a positive number'
    }
  },
  status: {
    type: String,
    enum: ['inprogress', 'cancelled', 'ended'],
    default: 'inprogress'
  },
  empBukupId: {
    type: Number,
    required: [true, 'Backup employee ID is required'],
    validate: {
      validator(v) {
        return v !== this.empId;
      },
      message: 'Backup employee cannot be the same as the requesting employee'
    }
  }
}, {
  timestamps: true,
  _id: false
});

leaveSchema.plugin(AutoIncrement);

const Leave = mongoose.model('Leave', leaveSchema);
export default Leave;
