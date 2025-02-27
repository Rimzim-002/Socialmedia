let usersData = [];  // Store user data

// Fetch User Data
function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            usersData = users;
            renderUsers();
        })
        .catch(error => {
            console.log('Error fetching users:', error);
        });
}

// Render User Cards
function renderUsers() {
    const userContainer = document.querySelector('.user-cards-container');
    userContainer.innerHTML = ""; // Clear previous content

    usersData.forEach(user => {
        const userCard = document.createElement('div');
        userCard.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');

        userCard.innerHTML = `
    <div class="card user-card shadow text-center">
        <div class="card-body">
            <!-- Dummy Profile Picture -->
            <img src="../assests/Dummyimage.png" class="border shadow-sm rounded-circle mb-3" alt="Profile Picture" width="100" height="100">
            
            <h5 class="card-title">${user.name}</h5>
            <p class="card-text text-muted">${user.company.bs}</p>
            <a href="../Userdetail/userdetail.html?userId=${user.id}" class="btn view-profile-btn">View Profile</a>
        </div>
    </div>
`;

        userContainer.appendChild(userCard);
    });
}

// Call fetchUsers when the page is loaded
document.addEventListener('DOMContentLoaded', fetchUsers);
