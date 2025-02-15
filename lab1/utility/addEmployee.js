const fs = require("fs");
const counter = JSON.parse(fs.readFileSync("./data/counter.json", "utf-8"));
++counter.currentCounter;

function addEmployee(args, data) {
  const currentData = {
    level: "jr",
    yearsOfExperience: 0,
    id: counter.currentCounter,
  };

  const levelsChoices = ["jr", "mid-level", "sr", "lead"];

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--name")) {
      currentData.name = args[i].split("=")[1];
    } else if (args[i].startsWith("--email")) {
      currentData.email = args[i].split("=")[1];
    } else if (args[i].startsWith("--salary")) {
      currentData.salary = args[i].split("=")[1];
    } else if (args[i].startsWith("--level")) {
      const currentLevel = args[i].split("=")[1];
      if (levelsChoices.includes(currentLevel.toLowerCase())) {
        currentData.level = currentLevel;
      }
    } else if (args[i].startsWith("--yearsOfExperience")) {
      const experienceYears = +args[i].split("=")[1];
      if (experienceYears > 0) {
        console.log(experienceYears);
        currentData.yearsOfExperience = experienceYears;
      }
    } else if (args[i].startsWith("--age")) {
      currentData.age = args[i].split("=")[1];
    } else if (args[i].startsWith("--department")) {
      currentData.department = args[i].split("=")[1];
    }
  }
  data.push(currentData);
  fs.writeFileSync("./data/data.json", JSON.stringify(data, null, 2));

  fs.writeFileSync("./data/counter.json", JSON.stringify(counter));
}

module.exports = addEmployee;
