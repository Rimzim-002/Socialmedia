let postsData = [];
let imagesData = [];
let commentsData = [];
let usersData = []; // Store user data

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
  fetch('https://api.slingacademy.com/v1/sample-data/photos?offset=5&limit=50')
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
  const postsContainer = document.querySelector(".container");

  postsData.forEach((post, index) => {
    //comment counting........
    const postComments = commentsData.filter(comment => comment.postId === post.id);
    const commentCount = postComments.length;

    // Get the image for the post (use placeholder if no image found)
    const postImage = imagesData[index] ? imagesData[index].url : 'https://via.placeholder.com/500x250';

    // Create the post card
    const postCard = document.createElement('div');
    postCard.classList.add('card', 'post-card');

    // Create the card content
    postCard.innerHTML = `
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">${post.userId ? usersData.name : 'User not found'}</h5>
        <span class="three-dots">...</span>
      </div>

      <img src="${postImage}" alt="Post Image" class="post-image">

      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.body}</p>
      </div>

      <div class="card-footer d-flex">
        <button class="btn btn-light">
          <i class="twemoji">&#x2764;&#xFE0F;</i> Likes
        </button>
        <!-- Updated comment count using commentCount -->
        <button class="btn btn-light comment-toggle">
          <i class="fas fa-envelope"></i> Comments (${commentCount})
        </button>
      </div>

      <!-- Comment Section (Initially hidden) -->
      <div class="card-footer comment-section" style="display: none;">
        <p><strong>Comments:</strong></p>
        <div class="comments-container">
          ${postComments.map(comment => `
            <div class="comment-box">
              <h6 class="comment-name font-weight-bold">${comment.name}</h6>
              <p class="comment-body text-muted small">${comment.body}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Append the post card to the container
    postsContainer.appendChild(postCard);
  });
}

// Toggle comments visibility when clicking on the comment button
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('comment-toggle')) {
    const commentSection = e.target.closest('.card').querySelector('.comment-section');
    commentSection.style.display = (commentSection.style.display === 'none' || commentSection.style.display === '') ? 'block' : 'none';
  }
});


// Call fetchPosts when the page is loaded
document.addEventListener('DOMContentLoaded', fetchPosts);
