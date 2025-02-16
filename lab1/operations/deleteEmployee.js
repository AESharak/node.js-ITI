import { writeFileSync, readFileSync } from "fs";

function deleteEmployeeWithId(employeesData, id) {
  const counter = JSON.parse(readFileSync("./data/counter.json", "utf-8"));
  employeesData = employeesData.filter((emp) => emp.id !== id);
  if (counter.currentCounter === id) {
    counter.currentCounter--;
  }

  writeFileSync("./data/counter.json", JSON.stringify(counter));
  writeFileSync("./data/data.json", JSON.stringify(employeesData, null, 2));
}

export default deleteEmployeeWithId;
