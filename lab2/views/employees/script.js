async function fetchEmployees(){
    try {
        const response = await fetch('/api/employess');
        const employees = await response.json();

        employees.forEach(emp=>{
            const card = document.createElement('div');
            const container = document.getElementById('cardsContainer');
            card.className = 'card';
            card.innerHTML = `
            <h3>${emp.name}</h3>
            <p>Email: ${emp.email}</p>
            <p>Salary: ${emp.salary}</p>
            `;
            container.appendChild(card);
            

        })

    } catch (error) {
        console.error('Error fetching employees:', error);
        document.getElementById('cardsContainer').innerHTML = 
            `<p style="color: red">Error loading employees: ${error.message}</p>`;
    } 
}


fetchEmployees();