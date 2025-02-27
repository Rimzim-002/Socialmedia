# API Integration Assignment

## Project Description

The API Integration Assignment is a web-based application that interacts with the JSONPlaceholder API to fetch and manipulate user details, posts, and comments. Built using HTML, CSS, Bootstrap, and JavaScript, the project enables users to:

- Fetch and display posts, users, and comments. Additionally, images for the homepage are included to enhance the user experience.
- Perform Create, Read, Update, and Delete (CRUD) operations on posts.
- Ensure a smooth user experience with a responsive UI.

## Features

- **View All Posts**: The homepage displays all posts from all users.
- **See All Users**: Clicking on the "See Users" button allows you to view a list of all users.
- **View User Details**: Clicking on a specific user displays their profile information and all their posts.
- **Fetch and Show Comments**: Displays comments associated with each post.
- **Add New Post**: Allows users to create new posts.
- **Edit Post**: Users can modify existing posts.
- **Delete Post**: Users can remove posts permanently.
- **Responsive Design**: The app adapts to various screen sizes using Bootstrap.

## API Endpoints

The following API endpoints are utilized in this project:

### Resources

- `/posts` → 100 posts
- `/comments` → 500 comments
- `/users` → 10 users
- `/photos` → 50photos

### Supported Routes

- `GET /posts`
- `GET /posts/{id}`
- `GET /posts/{id}/comments`
- `GET /comments?postId={id}`
- `POST /posts`
- `PUT /posts/{id}`
- `PATCH /posts/{id}`
- `DELETE /posts/{id}`
- `GET/photos`

## Tech Stack

- **HTML**: For structuring the application.
- **CSS**: Provides styling for a better user experience.
- **Bootstrap**: Ensures a responsive design.
- **JavaScript**: Manages API integration and interactions.



## Usage

1. Open `homepage.html` in a browser.
2. View all posts from all users on the homepage.
3. Click "See Users" to view all users.
4. Click on a specific user to view their posts and details.
5. Click on the comment icon to see the comments.
6. Perform CRUD operations on posts.

