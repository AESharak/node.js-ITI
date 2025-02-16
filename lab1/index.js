import { readFileSync } from "fs";

import addEmployee from "./operations/addEmployee.js";
import editEmployeeWithId from "./operations/editEmployee.js";
import {
  listAllEmploees,
  listMatchedEmployees,
} from "./operations/listEmployees.js";
import deleteEmployeeWithId from "./operations/deleteEmployee.js";

const [, , cmd, ...args] = process.argv;

function manageEmployees() {
  const data = JSON.parse(readFileSync("./data/data.json", "utf-8"));

  if (cmd === "add") {
    addEmployee(args, data);
  } else if (cmd === "list") {
    if (args.length === 0) {
      listAllEmploees(data);
    } else if (args.length === 1) {
      const id = +args[0].split("=")[1];
      listMatchedEmployees(data, id);
    }
  } else if (cmd === "edit") {
    const id = +args[0].split("=")[1];
    editEmployeeWithId(data, id, args);
  } else if (cmd === "delete") {
    const id = +args[0].split("=")[1];
    deleteEmployeeWithId(data, id);
  } else {
    throw new Error("please use valid command");
  }
}

manageEmployees();
