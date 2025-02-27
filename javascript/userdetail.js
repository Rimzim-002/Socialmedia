// Get the userId from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId'); // Extract the userId value

let postsData = [], 
usersData = [];
let loadedPosts = 0;
const batchSize = 5;

  // Function to fetch user details based on the userId from the API
   function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users/' + userId)
        .then(response => response.json()) // Parse response to JSON
        .then(user => {
            usersData = user; // Store the user data
            renderUserDetails(user); // Render user details in the DOM
            fetchPosts(); // Fetch posts after user data is loaded
        })
        .catch(error => console.error('Error fetching users:', error)); // Log errors if any
}

// Function to fetch posts for the given userId
function fetchPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userId)
        .then(response => response.json()) // Parse response to JSON
        .then(posts => {
            postsData = posts; // Store the posts data
            renderPosts(); // Render posts on the page
        })
        .catch(error => console.error('Error fetching posts:', error)); // Log errors if any
}

// Function to render user details (name, email, phone, address)
function renderUserDetails(user) {
    document.getElementById("user-details").innerHTML = `
        <div class="card text-center shadow-lg custom-hover">
            <div class="card-body">
                <img src="../assests/Dummyimage.png" alt="Profile Picture" style="width: 100px; height: 100px;">
                <h5 class="card-title">${user.name}</h5>
                <p class="card-text">${user.email}</p>
                <p class="card-text">${user.phone}</p>
            </div>
        </div>
    `;
}


// Function to render the list of posts for the user
function renderPosts() {
    const postsContainer = document.getElementById("user-posts");
    postsContainer.classList.add("d-flex", "flex-wrap", "gap-3", "align-items-start"); // Prevent equal height issue
    postsContainer.innerHTML = ""; // Clear previous posts

    postsData.slice(0, loadedPosts + batchSize).forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('card', 'post-card', 'shadow-sm', 'p-3', 'rounded');
        postCard.style.width = "300px"; // Fixed width
        postCard.style.display = "flex"; // Makes sure card content stacks properly
        postCard.style.flexDirection = "column"; // Ensures content grows downward

        postCard.innerHTML = `
            <div class="card-header d-flex justify-content-between align-items-center bg-light text-dark rounded-top">
                <h5 class="card-title mb-0" id="title-${post.id}">${post.title}</h5>
                <div>
                    <i class="fa-solid fa-pen text-dark edit-icon me-2" onclick="editPost(${post.id})"></i>
                    <i class="fa-solid fa-trash text-dark delete-icon" onclick="deletePost(${post.id})"></i>
                </div>
            </div>
            <div class="card-body">
                <p class="card-text" id="body-${post.id}">${post.body}</p>
                <div id="edit-section-${post.id}" style="display:none;">
                    <input type="text" class="form-control mt-2 border-0 shadow-sm" id="edit-title-${post.id}" value="${post.title}">
                    <textarea class="form-control mt-2 border-0 shadow-sm" id="edit-body-${post.id}">${post.body}</textarea>
                    <button class="btn btn-success btn-sm mt-2 px-3 fw-bold" onclick="savePost(${post.id})">Save</button>
                    <button class="btn btn-secondary btn-sm mt-2 px-3" onclick="cancelEdit(${post.id})">Cancel</button>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between bg-light rounded-bottom">
                <button class="btn btn-outline-dark comment-toggle" onclick="toggleComments(${post.id})">
                    <i class="fas fa-comments"></i> Comments
                </button>
            </div>
            <div class="card-footer comment-section bg-white border-top p-2" id="comment-section-${post.id}" style="display: none;">
                <p><strong>Comments:</strong></p>
                <div class="comments-container" id="comments-container-${post.id}">
                    <!-- Comments will be dynamically inserted here -->
                </div>
            </div>
        `;

        postsContainer.appendChild(postCard);
        fetchComments(post.id); // Fetch and render comments
    });

    loadedPosts += batchSize; // Increase the number of loaded posts for next batch
}

     // ✅ Function to toggle comments (Only one post opens at a time)
      function toggleComments(postId) {
      const allComments = document.querySelectorAll('.comment-section');

       allComments.forEach(section => {
        if (section.id === `comment-section-${postId}`) {
            // Toggle only the clicked post
            section.style.display = section.style.display === "none" ? "block" : "none";
        } else {
            // Ensure all other comments are closed
            section.style.display = "none";
        }
    });
}




// Function to fetch comments for a specific post
function fetchComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json()) // Parse response to JSON
        .then(comments => renderComments(postId, comments)) // Render the comments for the post
        .catch(error => console.error('Error fetching comments:', error)); // Log errors if any
}

// Function to render comments below a post
     function renderComments(postId, comments) {
       const commentsContainer = document.getElementById(`comments-container-${postId}`);
       commentsContainer.innerHTML = ""; // Clear any previous comments

    if (comments.length > 0) {
        comments.forEach(comment => {
            const commentCard = document.createElement('div');
            commentCard.classList.add('card', 'mb-2');
            commentCard.innerHTML = `
                <div class="card-body">
                    <h6 class="card-title">${comment.name}</h6>
                    <p class="card-text">${comment.body}</p>
                    <p class="card-text"><strong>Email:</strong> ${comment.email}</p>
                </div>
            `;
            commentsContainer.appendChild(commentCard); // Add comment to the comments container
        });
    } else {
        commentsContainer.innerHTML = `<p>No comments for this post yet.</p>`;
    }
}

// Function to toggle the comment section
function toggleComments(postId) {
    const commentSection = document.getElementById(`comment-section-${postId}`);
    const display = commentSection.style.display === 'none' ? 'block' : 'none';
    commentSection.style.display = display;
}

// Function to handle editing a post (showing edit inputs)
function editPost(postId) {
    document.getElementById(`title-${postId}`).style.display = 'none'; // Hide the title
    document.getElementById(`body-${postId}`).style.display = 'none'; // Hide the body
    document.getElementById(`edit-section-${postId}`).style.display = 'block'; // Show the edit section
}

// Function to save the edited post to the UI and backend
function savePost(postId) {
    const updatedTitle = document.getElementById(`edit-title-${postId}`).value; // Get updated title
    const updatedBody = document.getElementById(`edit-body-${postId}`).value; // Get updated body

    // Find the post in the array and update its data
    const postIndex = postsData.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        postsData[postIndex].title = updatedTitle;
        postsData[postIndex].body = updatedBody;
    }

    // Update the post details in the DOM
    document.getElementById(`title-${postId}`).innerText = updatedTitle;
    document.getElementById(`body-${postId}`).innerText = updatedBody;

    // Hide edit section and show updated post content
    document.getElementById(`title-${postId}`).style.display = 'block';
    document.getElementById(`body-${postId}`).style.display = 'block';
    document.getElementById(`edit-section-${postId}`).style.display = 'none';

    // Update the post on the backend
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({ title: updatedTitle, body: updatedBody }),
        headers: { 'Content-Type': 'application/json' }
    });
}

// Function to cancel editing a post (hide edit section and show original content)
function cancelEdit(postId) {
    document.getElementById(`edit-section-${postId}`).style.display = 'none'; // Hide the edit section
    document.getElementById(`title-${postId}`).style.display = 'block'; // Show original title
    document.getElementById(`body-${postId}`).style.display = 'block'; // Show original body
}

// Function to delete a post
function deletePost(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
    })
        .then(() => {
            // Remove the deleted post from postsData and re-render the posts
            postsData = postsData.filter(post => post.id !== postId);
            renderPosts();
        })
        .catch(error => console.error('Error deleting post:', error)); // Log errors if any
}

// Function to add a new post
document.getElementById("add-post").addEventListener("click", function () {
    const title = document.getElementById("new-post-title").value; // Get the title from the input
    const body = document.getElementById("new-post-body").value; // Get the body from the input
    if (title && body) {
        const newPost = { userId, title, body }; // Create a new post object
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json()) // Parse response to JSON
            .then(post => {
                postsData.unshift(post); // Add the new post to the beginning of the posts array
                renderPosts(); // Re-render the posts list
                document.getElementById("new-post-title").value = ""; // Clear input fields
                document.getElementById("new-post-body").value = "";
            })
            .catch(error => console.error('Error adding post:', error)); // Log errors if any
    }
});

// Load more posts when the "Load More" button is clicked
document.getElementById("load-more").addEventListener("click", renderPosts);

// On page load, fetch user and posts data
document.addEventListener('DOMContentLoaded', fetchUsers);