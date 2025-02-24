import Employee from '../models/employee.model.js';
import Leave from '../models/leave.model.js';

export const submitLeave = async (req, res, next) => {
  try {
    const {empId, type, duration, empBukupId} = req.body;

    // Validate if employee exists
    const employee = await Employee.findById(empId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Employee not found'
      });
    }

    // Validate if backup employee exists
    const backupEmployee = await Employee.findById(empBukupId);
    if (!backupEmployee) {
      return res.status(404).json({
        success: false,
        error: 'Backup employee not found'
      });
    }

    const leave = await Leave.create({
      empId,
      type,
      duration,
      empBukupId
    });

    res.status(201).json({
      success: true,
      leave
    });
  } catch (error) {
    next(error);
  }
};

export const updateLeave = async (req, res, next) => {
  try {
    const {type, duration, status} = req.body;
    const leaveId = req.params.id;

    const leave = await Leave.findById(leaveId);

    if (!leave) {
      return res.status(404).json({
        success: false,
        error: 'Leave not found'
      });
    }

    // Check if leave can be updated
    if (leave.status === 'ended') {
      return res.status(400).json({
        success: false,
        error: 'Cannot update an ended leave'
      });
    }

    // Only allow status change to 'cancelled' if current status is 'inprogress'
    if (status === 'cancelled' && leave.status !== 'inprogress') {
      return res.status(400).json({
        success: false,
        error: 'Can only cancel leaves that are in progress'
      });
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
      leaveId,
      {type, duration, status},
      {new: true, runValidators: true}
    );

    res.status(200).json({
      success: true,
      leave: updatedLeave
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeLeaves = async (req, res, next) => {
  try {
    const empId = req.params.id;

    // Validate if employee exists
    const employee = await Employee.findById(empId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: 'Employee not found'
      });
    }

    const leaves = await Leave.find({empId});

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves
    });
  } catch (error) {
    next(error);
  }
};

export const getLeaves = async (req, res, next) => {
  try {
    const {limit = 10, skip = 0, status} = req.query;
    const userId = req.headers['user-id']; // Get user ID from headers

    // Validate if user exists
    const user = await Employee.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Build query
    const query = {};
    if (status) {
      query.status = status;
    }

    // Find leaves with pagination and populate employee details
    const leaves = await Leave.find(query)
      .skip(Number.parseInt(skip))
      .limit(Number.parseInt(limit))
      .populate('empId', '_id username')
      .lean();

    // Format response to include only username and user id
    const formattedLeaves = leaves.map((leave) => ({
      ...leave,
      employee: {
        id: leave.empId._id,
        username: leave.empId.username
      },
      empId: undefined
    }));

    res.status(200).json({
      success: true,
      count: formattedLeaves.length,
      leaves: formattedLeaves
    });
  } catch (error) {
    next(error);
  }
};
