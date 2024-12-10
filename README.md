# Shop Space Management

## Overview

**Shop Space Management** is a full-stack application that allows users to efficiently manage their shop spaces. The application includes features like **user authentication**, **space management**, and a **responsive interface** built with modern technologies.

This repository contains both the frontend and backend code, enabling a seamless experience for managing shop spaces.

For detailed information about the API endpoints used in this project, refer to the [API Documentation](./API-DOCS.md).

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication**:  
  - Secure registration and login using JWT.
  - Password hashing with bcrypt for enhanced security.

- **Space Management**:  
  - Create, view, update, and delete shop spaces.

- **Responsive Design**:  
  - Built with Next.js and Tailwind CSS for a seamless user experience.

- **API Integration**:  
  - Frontend communicates with backend APIs for data management.

---

## Technologies Used

### Backend
- **Express**: Web framework for Node.js.
- **SQLite**: Lightweight database solution using better-sqlite3.
- **bcrypt**: Secure password hashing.
- **jsonwebtoken**: JWT implementation.
- **validator**: Data validation and sanitization.
- **CORS**: Middleware for cross-origin requests.

### Frontend
- **Next.js**: React framework for production.
- **React**: JavaScript library for user interfaces.
- **Axios**: HTTP client for API communication.
- **Tailwind CSS**: Utility-first CSS framework.
- **TypeScript**: Typed JavaScript for reliability.

---

## Getting Started

### Prerequisites
- **Node.js** v16 or higher.
- **npm** or **Yarn**.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/shop-space-management.git
   ```
2. Set up the backend:
   ```bash
   cd shop-space-management/backend
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `backend` directory based on `.env.example`.
4. Start the backend server:
   ```bash
   npm start
   ```
5. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```
6. Start the frontend server:
   ```bash
   npm run dev
   ```

### Access the Application
- Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License.
