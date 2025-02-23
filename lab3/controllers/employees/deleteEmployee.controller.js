import {readData} from '../../helpers/readData.helper.js';
import {writeData} from '../../helpers/writeData.helper.js';

export function deleteEmployee(req, res) {
  const employeeData = readData();
  const index = employeeData.findIndex((emp) => emp.id === +req.params.id);
  if (index === -1) {
    res.status(404).json({message: 'Employee Not Found'});
  }
  const dataAfterRemovalEmp = employeeData.filter((emp) => emp.id !== +req.params.id);
  writeData(JSON.stringify(dataAfterRemovalEmp));
  res.json({message: 'Employee Deleted Successfully'});
}
