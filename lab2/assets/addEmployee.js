const EmployeeForm = document.getElementById('employeeForm');

EmployeeForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    salary: Number(document.getElementById('salary').value),
    level: document.getElementById('level').value || 'jr',
    yearsOfExperience: Number(document.getElementById('years').value) || 0
  };

  try {
    const response = await fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Failed to add employee');
    }

    const messageDiv = document.getElementById('message');
    messageDiv.textContent = 'Employee added successfully!';
    messageDiv.className = 'message success';
    document.getElementById('employeeForm').reset();
  } catch (error) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = error.message;
    messageDiv.className = 'message error';
  }
});
