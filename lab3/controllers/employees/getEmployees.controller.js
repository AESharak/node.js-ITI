import {readData} from '../../helpers/readData.helper.js';

export function getEmployees(req, res) {
  const {name, salary} = req.query;
  let filteredData = readData();

  if (name) filteredData = filteredData.filter((emp) => emp.name.toLowerCase().includes(name.toLowerCase()));
  if (salary) filteredData = filteredData.filter((emp) => emp.salary > +salary);

  if (filteredData.length === 0) res.render('employees', {info: 'not found', message: 'Not Found Employees'});
  res.render('employees', {info: null, employees: filteredData});
}
