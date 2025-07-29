# User Registration API Documentation

## Endpoint

`POST /api/v1/users/register`

## Description

Registers a new user in the system. Requires a valid email, a password (minimum 6 characters), and a first name (minimum 3 characters). Returns the created user object and an authentication token upon success.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John", // required, min 3 characters
    "lastname": "Doe" // optional, min 3 characters if provided
  },
  "email": "john@example.com", // required, must be a valid email
  "password": "secret123" // required, min 6 characters
}
```

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "success": true,
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john@example.com",
      "socketId": null,
      "createdAt": "2025-07-28T12:34:56.789Z",
      "updatedAt": "2025-07-28T12:34:56.789Z"
    },
    "token": "jwt_token",
    "message": "User Registred Successfully"
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "success": false,
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

### Duplicate Email

- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "success": false,
    "message": "User with this email already exists."
  }
  ```

---

## Notes

- All fields marked as required must be provided.
- The password is securely hashed before storage.
- On success, a JWT token is returned for authentication in future# User Registration API Documentation

## Endpoint

`POST /api/v1/users/register`

## Description

Registers a new user in the system. Requires a valid email, a password (minimum 6 characters), and a first name (minimum 3 characters). Returns the created user object and an authentication token upon success.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John", // required, min 3 characters
    "lastname": "Doe" // optional, min 3 characters if provided
  },
  "email": "john@example.com", // required, must be a valid email
  "password": "secret123" // required, min 6 characters
}
```

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "success": true,
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john@example.com",
      "socketId": null,
      "createdAt": "2025-07-28T12:34:56.789Z",
      "updatedAt": "2025-07-28T12:34:56.789Z"
    },
    "token": "jwt_token",
    "message": "User Registred Successfully"
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "success": false,
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

### Duplicate Email

- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "success": false,
    "message": "User with this email already exists."
  }
  ```

---

## Notes

- All fields marked as required must be provided.
- The password is securely hashed before storage.
- On success, a JWT token is returned for authentication in future

---

# User Login API Documentation

## Endpoint

`POST /api/v1/users/login`

## Description

Authenticates a user using email and password. Returns the user object and an authentication token upon successful login.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john@example.com", // required, must be a valid email
  "password": "secret123" // required, min 6 characters
}
```

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "success": true,
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john@example.com",
      "socketId": null,
      "createdAt": "2025-07-28T12:34:56.789Z",
      "updatedAt": "2025-07-28T12:34:56.789Z"
    },
    "token": "jwt_token",
    "message": "User Logged in Successfully"
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "success": false,
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

### Invalid Credentials

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "success": false,
    "message": "Invalid Email and Password"
  }
  ```
  or
  ```json
  {
    "success": false,
    "message": "Invalid Password! Try again..."
  }
  ```

---

## Notes

- Both fields are required.
- On success, a JWT token is returned for authentication in future requests.

---

# User Profile API Documentation

## Endpoint

`GET /api/v1/users/profile`

## Description

Fetches the authenticated user's profile information. Requires a valid authentication token (JWT) to be sent in the request cookies.

---

## Request

- **Headers:**
  - `Cookie: authToken=jwt_token` (required)

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "success": true,
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john@example.com",
      "socketId": null,
      "createdAt": "2025-07-28T12:34:56.789Z",
      "updatedAt": "2025-07-28T12:34:56.789Z"
    },
    "message": "User Profile Fetched Successfully"
  }
  ```

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "success": false,
    "message": "Authentication required" // or a similar error message
  }
  ```

---

## Notes

- This endpoint is protected and requires authentication.
- Returns the user's profile data if the token is valid.

---

# User Logout API Documentation

## Endpoint

`POST /api/v1/users/logout`

## Description

Logs out the authenticated user by clearing the authentication token cookie.

---

## Request

- **Headers:**
  - `Cookie: authToken=jwt_token` (required)

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "success": true,
    "message": "User Logged out Successfully"
  }
  ```

### Unauthorized

- **Status Code:** `400 Bad Request` or `401 Unauthorized`
- **Body:**
  ```json
  {
    "success": false,
    "message": "Authentication required" // or a similar error message
  }
  ```

---

## Notes

- This endpoint is protected and requires authentication.
- On success, the authentication cookie is cleared and the user is logged out.

---

# Captain Registration API Documentation

## Endpoint

`POST /api/v1/captain/register`

## Description

Registers a new captain (driver) in the system. Requires valid personal and vehicle details. Returns the created captain object and an authentication token upon success.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "Jane", // required, min 3 characters
    "lastname": "Smith" // optional, min 3 characters if provided
  },
  "email": "jane@example.com", // required, must be a valid email
  "password": "secret123", // required, min 6 characters
  "vehicle": {
    "color": "Red", // required, min 3 characters
    "plate": "ABC123", // required, min 3 characters
    "capacity": 4, // required, integer >= 1
    "vehicleType": "car" // required, one of: "car", "motorcycle", "auto"
  }
}
```

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "success": true,
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane@example.com",
      "socketId": null,
      "status": "inactive",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "createdAt": "2025-07-28T12:34:56.789Z",
      "updatedAt": "2025-07-28T12:34:56.789Z"
    },
    "token": "jwt_token",
    "message": "Captain Registred Successfully"
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "success": false,
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

### Duplicate Email

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "success": false,
    "message": "Captain already exists"
  }
  ```

---

## Notes

- All required fields must be provided and valid.
- The password is securely hashed before storage.
- On success, a JWT token is returned for authentication in

---

# Captain Login API Documentation

## Endpoint

`POST /api/v1/captain/login`

## Description

Authenticates a captain using email and password. Returns the captain object and an authentication token upon successful login.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "jane@example.com", // required, must be a valid email
  "password": "secret123" // required, min 6 characters
}
```

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "success": true,
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane@example.com",
      "socketId": null,
      "status": "inactive",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "createdAt": "2025-07-28T12:34:56.789Z",
      "updatedAt": "2025-07-28T12:34:56.789Z"
    },
    "token": "jwt_token",
    "message": "Captain Logged in Successfully"
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "success": false,
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

### Invalid Credentials

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "success": false,
    "message": "Invalid Email and Password"
  }
  ```
  or
  ```json
  {
    "success": false,
    "message": "Invalid Password! Try again..."
  }
  ```

---

## Notes

- Both fields are required.
- On success, a JWT token is returned for authentication in future requests.

---

# Captain Profile API Documentation

## Endpoint

`GET /api/v1/captain/profile`

## Description

Fetches the authenticated captain's profile information. Requires a valid authentication token (JWT) to be sent in the request cookies.

---

## Request

- **Headers:**
  - `Cookie: authToken=jwt_token` (required)

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "success": true,
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane@example.com",
      "socketId": null,
      "status": "inactive",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "createdAt": "2025-07-28T12:34:56.789Z",
      "updatedAt": "2025-07-28T12:34:56.789Z"
    },
    "message": "Captain Profile Fetched Successfully"
  }
  ```

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "success": false,
    "message": "Authentication required" // or a similar error message
  }
  ```

---

## Notes

- This endpoint is protected and requires authentication.
- Returns the captain's profile data if the token is valid.

---

# Captain Logout API Documentation

## Endpoint

`POST /api/v1/captain/logout`

## Description

Logs out the authenticated captain by clearing the authentication token cookie.

---

## Request

- **Headers:**
  - `Cookie: authToken=jwt_token` (required)

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "success": true,
    "message": "Captain Logged out Successfully"
  }
  ```

### Unauthorized

- **Status Code:** `400 Bad Request` or `401 Unauthorized`
- **Body:**
  ```json
  {
    "success": false,
    "message": "Authentication required" // or a similar error message
  }
  ```

---

## Notes

- This endpoint is protected and requires authentication.
- On success, the authentication cookie is cleared and the captain is
