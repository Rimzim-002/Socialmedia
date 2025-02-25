        // Declare global variables
        let postsData = [];
        let imagesData = [];
        let commentsData = [];
        let usersData = []; // Store user data

        // Get userId from URL
        const urlParams = new URLSearchParams(window.location.search);
        const userId = parseInt(urlParams.get('userId'));

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
                    renderUserDetails(userId); // Pass userId to render details dynamically
                })
                .catch(error => {
                    console.log('Error fetching users:', error);
                });
        }

        // Render User Details dynamically
        function renderUserDetails(userId) {
            const user = usersData.find(u => u.id === userId);

            if (user) {
                // Render user details
                const userDetailsContainer = document.getElementById("user-details");
                userDetailsContainer.innerHTML = `
                    <div class="card">
                            <div class="card-body">
                            <h5 class="card-title">${user.name}</h5>
                            <p class="card-text"><i class="fas fa-envelope"></i> ${user.email}</p>
                            <p class="card-text"><i class="fas fa-phone"></i> ${user.phone}</p>
                            <p class="card-text"><i class="fas fa-map-marker-alt"></i> ${user.address.street}, ${user.address.city}</p>
                        </div>
                    </div>
                `;

                renderPostsWithCommentsAndImages(userId); // Render posts once user details are rendered
            }
        }

        // Render Posts with Comments, Images, and User Data
        function renderPostsWithCommentsAndImages(userId) {
            const postsContainer = document.getElementById("user-posts");
            postsContainer.innerHTML = ''; // Clear existing posts

            const userPosts = postsData.filter(post => post.userId === userId);

            userPosts.forEach((post, index) => {
                const postComments = commentsData.filter(comment => comment.postId === post.id);
                const commentCount = postComments.length;
                const postImage = imagesData[index] ? imagesData[index].url : 'https://via.placeholder.com/500x250';

                // Find the user who created this post based on userId
                const user = usersData.find(u => u.id === post.userId);
                const userName = user ? user.name : 'User not found';  // Dynamically display the user name or fallback

                const postCard = document.createElement('div');
                postCard.classList.add('card', 'post-card');

                postCard.innerHTML = `
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="card-title mb-0">${userName}</h5> <!-- Use dynamic user name -->
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
                        <button class="btn btn-light comment-toggle">
                            <i class="fas fa-envelope"></i> Comments (${commentCount})
                        </button>
                    </div>

                    <div class="card-footer comment-section">
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

                postsContainer.appendChild(postCard);
            });
        }

        // Toggle comments visibility
        document.addEventListener('click', function (e) {
            if (e.target.classList.contains('comment-toggle')) {
                const commentSection = e.target.closest('.card').querySelector('.comment-section');
                commentSection.style.display = (commentSection.style.display === 'none' || commentSection.style.display === '') ? 'block' : 'none';
            }
        });

        // Call fetchPosts when the page is loaded
        document.addEventListener('DOMContentLoaded', fetchPosts);
