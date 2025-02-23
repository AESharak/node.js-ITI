import {readData} from '../../helpers/readData.helper.js';
import {writeData} from '../../helpers/writeData.helper.js';

export function createEmployee(req, res) {
  const employeeData = readData();
  const newId = employeeData.at(-1).id + 1;
  const newEmployee = {
    level: 'jr',
    yearsOfExperience: 0,
    id: newId,
    ...req.body
  };

  employeeData.push(newEmployee);
  writeData(JSON.stringify(employeeData));
  res.status(201).json({message: 'Employee Added Successfully'});
}
