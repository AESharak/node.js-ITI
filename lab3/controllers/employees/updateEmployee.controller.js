import {readData} from '../../helpers/readData.helper.js';
import {writeData} from '../../helpers/writeData.helper.js';

export function updateEmployee(req, res) {
  const employeeData = readData();
  const index = employeeData.findIndex((emp) => emp.id === +req.params.id);
  if (index === -1) {
    res.status(404).json({message: 'Employee Not Found'});
  }

  employeeData[index] = {...employeeData[index], ...req.body};
  writeData(JSON.stringify(employeeData));
  res.json({message: 'Employee Updated Successfully'});
}
