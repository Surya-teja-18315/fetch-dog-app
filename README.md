# DogAdopt - Find Your Perfect Furry Friend

Welcome to **DogAdopt**, a web application that helps users find and adopt dogs by browsing available breeds, filtering based on location, and more. This app was built using **React** and is deployed to **GitHub Pages**.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Features](#features)

---

## Technologies Used

This project uses the following technologies:

- **React.js**: A JavaScript library for building user interfaces.
- **Axios**: For making API requests to Fetch's dog adoption API.
- **React Router**: For navigation and routing between pages.
- **Tailwind CSS**: For styling the application with utility-first CSS classes.
- **GitHub Pages**: For deploying the app.
- **gh-pages**: A package to easily deploy the React app to GitHub Pages.

---

## Setup Instructions

Follow these steps to set up the project on your local machine.

### Prerequisites

You need to have the following installed on your system:
- **Node.js** (at least v14.x.x)
- **npm** or **yarn** (npm is bundled with Node.js)

### Installation & Running the development server

1. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/Surya-teja-18315/fetch-dog-app.git

2. ```bash cd fetch-dog-app
3. ```bash npm install
4. **Start the development server**
    ```bash 
    npm start

    Runs the app in the development mode.
    Open http://localhost:3000 to view it in the browser.

    The page will reload if you make edits.
    You will also see any lint errors in the console.

6. npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## Features

1. **User Authentication**:  
   Users must log in with their name and email to access the search page.

2. **Dog Search and Filters**:  
   Users can search for dogs based on breed, location (city and state), and age. Results can be sorted and paginated.

3. **Favorites List**:  
   Users can select their favorite dogs and then generate a match based on their choices.

4. **Responsive Design**:  
   The app is fully responsive, thanks to Tailwind CSS, and works on both desktop and mobile devices.

5. **Logout Functionality**:  
   Allows users to log out and return to the login page.

## API Reference

The app communicates with Fetch's dog adoption API. Here are the key endpoints:

- **`POST /auth/login`**:  
  Logs in the user with their name and email.

- **`GET /dogs/breeds`**:  
  Retrieves all available dog breeds.

- **`GET /dogs/search`**:  
  Searches for dogs based on filters (breed, age, location).

- **`POST /dogs/match`**:  
  Matches a user with a dog based on their favorites list.

- **`POST /locations/search`**:  
  Searches for locations based on city and state.


