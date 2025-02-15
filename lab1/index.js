const fs = require("fs");

const addEmployee = require("./utility/addEmployee");
const listAllEmploees = require("./utility/listEmployees").listAllEmploees;
const listMatchedEmployees =
  require("./utility/listEmployees").listMatchedEmployees;
const [, , cmd, ...args] = process.argv;

const data = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"));

if (cmd === "add") {
  addEmployee(args, data);
} else if (cmd === "list") {
  if (args.length === 0) {
    listAllEmploees(data);
  } else if (args.length === 1) {
    const id = +args[0].split("=")[1];
    listMatchedEmployees(data, id);
  }
}
