import {readData} from '../../helpers/readData.helper.js';

export function getEmployee(req, res) {
  const foundEmloyee = readData().find((emp) => emp.id === +req.params.id);
  if (!foundEmloyee) {
    return res.render('employee', {
      error: true,
      message: 'Employee Not Found'
    });
  }
  res.render('employee', {error: false, employee: foundEmloyee});
}
