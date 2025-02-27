let postsData = [];
let imagesData = [];
let commentsData = [];
let usersData = [];

// Fetch Posts Data
function fetchPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            postsData = posts;
            fetchImages();
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
            fetchComments();
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
            fetchUsers();
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
            renderPostsWithCommentsAndImages();
        })
        .catch(error => {
            console.log('Error fetching users:', error);
        });
}

// Render Posts with Comments, Images, and User Data
function renderPostsWithCommentsAndImages() {
  const postsContainer = document.querySelector(".container");
  postsContainer.innerHTML = ""; // Clear previous posts

  // Apply Flexbox layout
  postsContainer.classList.add("d-flex", "flex-wrap", "gap-3", "align-items-start");

  postsData.forEach((post, index) => {
      // Get the user data for this post
      const user = usersData.find(user => user.id === post.userId);
      const userName = user ? user.name : "Unknown User";

      // Get the image for the post (use placeholder if no image found)
      const postImage = imagesData[index] ? imagesData[index].url : 'https://via.placeholder.com/500x250';

      // Get comments related to this post
      const postComments = commentsData.filter(comment => comment.postId === post.id);
      const commentCount = postComments.length;

      // Create the post card
      const postCard = document.createElement('div');
      postCard.classList.add('card', 'post-card', 'shadow-sm', 'p-3', 'rounded');
      postCard.style.width = "350px"; // Fixed width for cards
      postCard.style.display = "flex";
      postCard.style.flexDirection = "column";

      postCard.innerHTML = `
          <div class="card-header d-flex justify-content-between align-items-center bg-primary text-white">
              <h6 class="card-title mb-0">${userName}</h6>
              <span class="three-dots">⋮</span>
          </div>

          <img src="${postImage}" alt="Post Image" class="post-image w-100 rounded" style="height: 200px; object-fit: cover;">

          <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.body}</p>
          </div>

          <div class="card-footer d-flex justify-content-between bg-light">
              <button class="btn btn-outline-danger">
                  ❤️ Likes
              </button>
              <button class="btn btn-outline-dark comment-toggle" data-post-id="${post.id}">
                  💬 Comments (${commentCount})
              </button>
          </div>

          <!-- Comment Section (Initially hidden) -->
          <div class="card-footer comment-section bg-white border-top p-2" id="comment-section-${post.id}" style="display: none;">
              <p><strong>Comments:</strong></p>
              <div class="comments-container" style="max-height: 150px; overflow-y: auto;">
                  ${postComments.map(comment => `
                      <div class="comment-box p-2 border rounded my-1">
                          <h6 class="font-weight-bold">${comment.name}</h6>
                          <p class="small text-muted">${comment.body}</p>
                      </div>
                  `).join('')}
              </div>
          </div>
      `;

      // Append the post card to the container
      postsContainer.appendChild(postCard);
  });
}


// ✅ Toggle comments visibility (Only one post opens at a time)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('comment-toggle')) {
        const postId = e.target.getAttribute('data-post-id');
        const allComments = document.querySelectorAll('.comment-section');

        allComments.forEach(section => {
            if (section.id === `comment-section-${postId}`) {
                section.style.display = section.style.display === "none" ? "block" : "none";
            } else {
                section.style.display = "none";
            }
        });
    }
});

// Call fetchPosts when the page is loaded
document.addEventListener('DOMContentLoaded', fetchPosts);
