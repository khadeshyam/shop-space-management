# Shop Space Management Documentation

## Overview
Shop Space Management is a full-stack application designed to help users manage their shop spaces efficiently. It features user authentication, space management functionalities, and a responsive frontend interface built with modern technologies.

## Table of Contents
- Features
- Technologies Used
- Getting Started
- Prerequisites
- Installation
- Usage
- API Endpoints
- Frontend
- Contributing
- License

---

## Features

### User Authentication
- Secure registration and login using JWT.
- Password hashing using bcrypt for enhanced security.

### Space Management
- Create, view, and delete shop spaces.
- Simple API integration for managing space operations.

### Responsive Design
- Built with Next.js and Tailwind CSS for a seamless user experience.

### API Integration
- The frontend communicates with backend APIs using Axios for data fetching and manipulation.

---

## Technologies Used

### Backend
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Better-SQLite3**: SQLite3 bindings with a focus on simplicity and performance.
- **bcrypt**: Library for hashing passwords securely.
- **jsonwebtoken**: Implementation for handling JSON Web Tokens.
- **validator**: For string validation and sanitization.
- **CORS**: Express middleware to enable Cross-Origin Resource Sharing.

### Frontend
- **Next.js**: React framework for production.
- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for data requests.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: A typed superset of JavaScript.

---

## Getting Started

### Prerequisites
- **Node.js** v16 or higher.
- **npm** or **Yarn** package manager.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/shop-space-management.git
   ```

2. **Navigate to the backend directory and install dependencies**:
   ```bash
   cd shop-space-management/backend
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the `backend` directory based on the provided `.env.example`.

4. **Start the backend server**:
   ```bash
   npm start
   ```

5. **Navigate to the frontend directory and install dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

6. **Start the frontend development server**:
   ```bash
   npm run dev
   ```

### Access the Application
- Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

### Register
- **Create a new account** by providing a username, email, and password.

### Login
- **Access your account** using your email and password.

### Manage Spaces
- **Add new shop spaces**, **view existing ones**, and **delete as needed**.

---

## API Endpoints

### Authentication

#### Register User
- **Method**: POST
- **Endpoint**: `/api/auth/register`
- **Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### Login User
- **Method**: POST
- **Endpoint**: `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### Space Management

#### Delete a Space
- **Method**: DELETE
- **Endpoint**: `/api/spaces/:id`
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <your-token>"
  }
  ```

---

## Frontend

The frontend is built with **Next.js** and styled using **Tailwind CSS**. It communicates with the backend APIs using **Axios** for seamless data fetching and manipulation.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

### Contribution Steps:
1. **Fork the project**.
2. **Create your feature branch**:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add some feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/YourFeature
   ```
5. **Open a pull request**.

---

## License

This project is licensed under the MIT License.