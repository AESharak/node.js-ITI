import { writeFileSync } from "fs";

import parseArgs from "../utilities/parseArgs.js";
import validate from "../validations/validate.js";

function editEmployeeWithId(employeesData, id, args) {
  const parsedArgs = parseArgs(args);
  const currentData = {
    level: "jr",
    yearsOfExperience: 0,
    ...parsedArgs,
    id,
  };
  const employeeIdx = employeesData.findIndex((emp) => emp.id === id);

  if (parsedArgs.level) {
    const levelsChoices = ["jr", "mid-level", "sr", "lead"];
    if (!levelsChoices.includes(parsedArgs.level.toLowerCase())) {
      currentData.level = "jr";
    }
  }

  if (parsedArgs.yearsOfExperience) {
    const years = +parsedArgs.yearsOfExperience;
    currentData.yearsOfExperience = years > 0 ? years : 0;
  }

  if (currentData.age && !isNaN(+currentData.age)) {
    currentData.age = +currentData.age;
  }

  currentData.salary = +currentData.salary;
  employeesData[employeeIdx] = currentData;
  validate(currentData);
  writeFileSync("./data/data.json", JSON.stringify(employeesData, null, 2));
}

export default editEmployeeWithId;
