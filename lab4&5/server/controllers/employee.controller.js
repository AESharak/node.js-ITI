import Employee from '../models/employee.model.js';

export const createEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({success: true, employee});
  } catch (error) {
    next(error);
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({}, 'id firstName age');
    res.status(200).json({success: true, employees});
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({success: false, error: 'Employee not found'});
    }
    res.status(200).json({success: true, data: {}});
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true, runValidators: true}
    );

    if (!employee) {
      return res.status(404).json({success: false, error: 'Employee not found'});
    }

    res.status(200).json({success: true, employee});
  } catch (error) {
    next(error);
  }
};
