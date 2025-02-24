import express from 'express';
import {
  getEmployeeLeaves,
  getLeaves,
  submitLeave,
  updateLeave
} from '../controllers/leave.controller.js';

const router = express.Router();

// Submit a new leave
router.post('/', submitLeave);

// Update leave
router.patch('/:id', updateLeave);

// Get leaves for a specific employee
router.get('/employees/:id/leaves', getEmployeeLeaves);

// Get all leaves with filters
router.get('/', getLeaves);

export default router;
