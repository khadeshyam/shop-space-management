# Shop Space Management - API Documentation

## Overview

This document provides detailed information about the API endpoints used in the **Shop Space Management** application. It covers authentication and space management features.

---

## Table of Contents
- [Authentication](#authentication)
  - [Register](#register)
  - [Login](#login)
  - [Logout](#logout)
- [Spaces](#spaces)
  - [Get All Spaces for a User](#get-all-spaces-for-a-user)
  - [Fetch All Spaces](#fetch-all-spaces)
  - [Get Space by ID](#get-space-by-id)
  - [Add a New Space](#add-a-new-space)
  - [Update Space](#update-space)
  - [Delete Space](#delete-space)

---

## Authentication

### Register
- **Method**: `POST`  
- **Endpoint**: `/api/auth/register`  
- **Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

---

### Login
- **Method**: `POST`  
- **Endpoint**: `/api/auth/login`  
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

---

### Logout
- **Method**: `POST`  
- **Endpoint**: `/api/auth/logout`  

---

## Spaces

### Get All Spaces for a User
- **Method**: `GET`  
- **Endpoint**: `/api/users/:id/spaces`  
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <your-token>"
  }
  ```

---

### Fetch All Spaces
- **Method**: `GET`  
- **Endpoint**: `/api/spaces`  
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <your-token>"
  }
  ```

---

### Get Space by ID
- **Method**: `GET`  
- **Endpoint**: `/api/spaces/:id`  
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <your-token>"
  }
  ```

---

### Add a New Space
- **Method**: `POST`  
- **Endpoint**: `/api/spaces`  
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <your-token>"
  }
  ```  
- **Body**:
  ```json
  {
    "name": "string",
    "type": "string", // 'hanger' or 'shelf'
    "capacity": "number",
    "price_per_unit": "number"
  }
  ```

---

### Update Space
- **Method**: `PUT`  
- **Endpoint**: `/api/spaces/:id`  
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <your-token>"
  }
  ```  
- **Body**:
  ```json
  {
    "name": "string",
    "type": "string", // 'hanger' or 'shelf'
    "capacity": "number",
    "price_per_unit": "number"
  }
  ```

---

### Delete Space
- **Method**: `DELETE`  
- **Endpoint**: `/api/spaces/:id`  
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <your-token>"
  }
  ```  
