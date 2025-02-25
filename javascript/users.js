let postsData = [];
let imagesData = [];
let commentsData = [];
let usersData = [];  // Store user data

// Fetch Posts Data
function fetchPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
      postsData = posts;
      fetchImages(); // Fetch images once posts are fetched
    })
    .catch(error => {
      console.log('Error fetching posts:', error);
    });
}

// Fetch Image Data
function fetchImages() {
  fetch('https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=20')
    .then(response => response.json())
    .then(data => {
      imagesData = data.photos;
      fetchComments(); // Fetch comments once images are fetched
    })
    .catch(error => {
      console.log('Error fetching images:', error);
    });
}

// Fetch Comments Data
function fetchComments() {
  fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(comments => {
      commentsData = comments;
      fetchUsers(); // Fetch users once comments are fetched
    })
    .catch(error => {
      console.log('Error fetching comments:', error);
    });
}

// Fetch User Data
function fetchUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      usersData = users;
      renderPostsWithCommentsAndImages(); // Render posts once users are fetched
    })
    .catch(error => {
      console.log('Error fetching users:', error);
    });
}

// Render Posts with Comments, Images, and User Data
function renderPostsWithCommentsAndImages() {
  const postsContainer = document.querySelector(".container"); // Get the container to add posts

  postsData.forEach((post, index) => {
    // Get the image for the post (fallback if no image is found)
    const postImage = imagesData[index] ? imagesData[index].url : 'https://via.placeholder.com/500x250';

    // Get the comments for the current post
    const postComments = commentsData.filter(comment => comment.postId === post.id);

    // Get the user for the current post using userId
    const user = usersData.find(user => user.id === post.userId);

    // Create a new card for each post
    const postCard = document.createElement('div');
    postCard.classList.add('card', 'post-card');

    // Create the card content
    postCard.innerHTML = `
      <div class="card-header d-flex justify-content-between align-items-center">
        <!-- Display the User's Username in the Title -->
        <h5 class="card-title mb-0">${user ? user.username : 'User not found'}</h5> <!-- User's username as card title -->
        <span class="three-dots">...</span>
      </div>

      <img src="${postImage}" alt="Post Image" class="post-image"> <!-- Post Image -->

      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.body}</p>
      </div>

      <div class="card-footer">
        <p><strong>Comments:</strong></p>
        <div class="comments-container">
          ${postComments.map(comment => `
            <div class="comment-box">
              <h6 class="comment-name font-weight-bold">${comment.name}</h6> <!-- Bold Comment Name -->
              <p class="comment-body text-muted small">${comment.body}</p> <!-- Small text for Comment Body -->
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Append the post card to the container
    postsContainer.appendChild(postCard);
  });
}

// Call fetchPosts when the page is loaded
document.addEventListener('DOMContentLoaded', fetchPosts);
