const API_URL = 'http://localhost:3000/employees';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const showError = (message) => {
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 5000);
};

const createStatusBadge = (status) => {
  return `<span class="status-badge status-${status.toLowerCase()}">${status}</span>`;
};

async function fetchLeaves() {
  const employeeId = document.getElementById('employeeId').value;
  const status = document.getElementById('status').value;
  const leavesBody = document.getElementById('leavesBody');

  try {
    leavesBody.innerHTML = '';

    const queryParams = new URLSearchParams({
      limit: 10,
      skip: 0
    });

    if (status) {
      queryParams.append('status', status);
    }

    const endpoint = employeeId
      ? `${API_URL}/employees/${employeeId}/leaves`
      : `${API_URL}/leaves?${queryParams}`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user-id': employeeId
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch leaves');
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch leaves');
    }

    data.leaves.forEach((leave) => {
      const row = document.createElement('tr');
      row.innerHTML = `
                <td>${
                  leave.employee ? leave.employee.username : leave.empId
                }</td>
                <td>${leave.type}</td>
                <td>${leave.duration} days</td>
                <td>${createStatusBadge(leave.status)}</td>
                <td>${formatDate(leave.createdAt)}</td>
            `;
      leavesBody.appendChild(row);
    });

    if (data.leaves.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML
        = '<td colspan="5" style="text-align: center;">No leaves found</td>';
      leavesBody.appendChild(row);
    }
  } catch (error) {
    console.error('Error:', error);
    showError(error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchLeaves();
});
