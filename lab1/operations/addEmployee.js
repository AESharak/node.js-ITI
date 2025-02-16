import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import process from 'node:process';

import parseArgs from '../utilities/parseArgs.js';
import validate from '../validations/validate.js';

const counter = JSON.parse(readFileSync(join(process.cwd(), 'data', 'counter.json'), 'utf-8'));

function addEmployee(args, data) {
  const parsedArgs = parseArgs(args);
  const currentData = {
    level: 'jr',
    yearsOfExperience: 0,
    ...parsedArgs,
    id: ++counter.currentCounter
  };

  validate(parsedArgs);

  if (parsedArgs.level) {
    const levelsChoices = ['jr', 'mid-level', 'sr', 'lead'];
    if (!levelsChoices.includes(parsedArgs.level.toLowerCase())) {
      currentData.level = 'jr';
    }
  }

  if (parsedArgs.yearsOfExperience) {
    const years = +parsedArgs.yearsOfExperience;
    currentData.yearsOfExperience = years > 0 ? years : 0;
  }

  if (currentData.age && !Number.isNaN(+currentData.age)) {
    currentData.age = +currentData.age;
  }

  currentData.salary = +currentData.salary;

  data.push(currentData);
  writeFileSync(join(process.cwd(), 'data', 'data.json'), JSON.stringify(data, null, 2));
  writeFileSync(join(process.cwd(), 'data', 'counter.json'), JSON.stringify(counter));
}

export default addEmployee;
