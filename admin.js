document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();

        const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

        users.forEach(user => {
            const row = userTable.insertRow();

            const emailCell = row.insertCell(0);
            const branchNameCell = row.insertCell(1);
            const passwordCell = row.insertCell(2);
            const activitiesCell = row.insertCell(3);

            emailCell.textContent = user.email;
            branchNameCell.textContent = user.branchName;
            passwordCell.textContent = user.password;

            const activities = user.activities.map(activity => `${activity.action} at ${activity.timestamp}`).join(', ');
            activitiesCell.textContent = activities;
        });

    } catch (error) {
        console.error('Error loading user data:', error);
    }
});
