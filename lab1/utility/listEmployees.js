const fs = require("fs");

// Helper function
function list(dataToRead) {
  const listData = dataToRead
    .map(
      (employee) =>
        `Name: ${employee.name}, Email: ${employee.email}, Salary: ${employee.salary}, Level: ${employee.level}, YearsOfExperience: ${employee.yearsOfExperience}`
    )
    .join("\n");

  console.log(listData);
}

function listAllEmploees(dataToRead) {
  list(dataToRead);
}

function listMatchedEmployees(dataToRead, id) {
  const filteredEmployees = dataToRead.filter((emp) => emp.id === id);
  list(filteredEmployees);
}

module.exports = { listAllEmploees, listMatchedEmployees };
