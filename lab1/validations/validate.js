function validate(inputtedData) {
  const options = [];
  for (const key in inputtedData) {
    options.push(key);
  }
  if (!options.includes('name')) {
    throw new Error('Please provide the name of the employee');
  } else if (!options.includes('email')) {
    throw new Error('Please provide the email of the employee');
  } else if (!options.includes('salary')) {
    throw new Error('Please provide the salary of the employee');
  }

  if (inputtedData.name.length < 3 || inputtedData.name.length > 16) {
    throw new Error(
      'Please provide a proper name (length in the range of [3-16])'
    );
  }

  if (+inputtedData.salary < 0 || Number.isNaN(+inputtedData.salary)) {
    throw new Error('Please Enter a proper salary value');
  }

  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
  if (!emailRegex.test(inputtedData.email)) {
    throw new Error('Please provide a valid email address');
  }
}

export default validate;
