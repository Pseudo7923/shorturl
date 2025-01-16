# URL Shortener

A simple and efficient URL shortening service that converts long URLs into short, shareable links, built with React.js, Node.js, Express.js, and MySQL.

## Features

- **URL Shortening**: Converts long URLs into short, manageable links for easy sharing.
- **Redirection**: Automatically redirects users from the shortened URL to the original URL.
- **RESTful API**: Provides an API to handle the shortening and redirection functionalities.
- **Front-End**: A clean, user-friendly interface built using React.js.
- **Back-End**: Node.js and Express.js handle the core logic of URL shortening and redirection.
- **Database**: MySQL is used for efficient storage and retrieval of original and shortened URLs.

## Tech Stack

- **Front-End**: React.js, Tailwind CSS
- **Back-End**: Node.js, Express.js
- **Database**: MySQL
- **Version Control**: Git

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Hritika-Ratnam/Short_URL.git
2. Navigate to the project directory:
    cd url-shortener
4. Install dependencies for both client and server:

 # Install server dependencies
    cd server
    npm install

 # Install client dependencies
    cd ../client
    npm install

4. Set up your MySQL database and update the database connection details in the server/config/db.js file.

  # Start the server:
    cd server
    npm start

 # Start the client:
    cd ../client
    npm start

## The application will be running at:
Front-end: http://localhost:3000
Back-end API: http://localhost:5000

# Usage
- **Enter a long URL** into the input field on the homepage
- **Click the "Shorten" button** to generate a shortened URL
- **Use the shortened URL** to quickly redirect to the original long URL

# Future Scope
- **URL analytics and tracking**
- **Expiration and custom URL shortening**
- **Improved security (CAPTCHA, OAuth integration)**
- **Mobile application support**
- **API monetization**

   
   
