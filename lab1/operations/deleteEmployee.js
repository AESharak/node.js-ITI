import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import process from 'node:process';

function deleteEmployeeWithId(employeesData, id) {
  const counter = JSON.parse(readFileSync('./data/counter.json', 'utf-8'));
  employeesData = employeesData.filter((emp) => emp.id !== id);
  if (counter.currentCounter === id) {
    counter.currentCounter--;
  }

  writeFileSync(join(process.cwd(), 'data', 'data.json'), JSON.stringify(employeesData, null, 2));
  writeFileSync(join(process.cwd(), 'data', 'counter.json'), JSON.stringify(counter));
}

export default deleteEmployeeWithId;
