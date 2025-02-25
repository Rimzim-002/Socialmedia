let usersData = [];  // Store user data

// Fetch User Data
function fetchUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      usersData = users;
      renderUsers(); // Render users once data is fetched
    })
    .catch(error => {
      console.log('Error fetching users:', error);
    });
}

// Render User Cards
function renderUsers() {
  const userContainer = document.querySelector('.user-cards-container'); // Get the container to add user cards

  // Loop through each user and create a card for them
  usersData.forEach(user => {
    // Create a new card for each user
    const userCard = document.createElement('div');
    userCard.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3','mb-3');

    // Set the HTML content of the card
    userCard.innerHTML = `
  <div class="card">
    <div class="card-body">
      <h5 class="card-title text-dark">${user.name}</h5> <!-- User Name -->
      <p class="card-text text-dark">${user.company.bs}</p> <!-- Some details about the user -->
      <a href="../Userdetail/userdetail.html?userId=${user.id}" class="btn btn-primary">View Profile</a> <!-- Link to user profile with userId -->
    </div>
  </div>
`;


    // Append the user card to the container
    userContainer.appendChild(userCard);
  });
}

// Call fetchUsers when the page is loaded
document.addEventListener('DOMContentLoaded', fetchUsers);
