# MERN Authentication System 🚀

A **secure** and **scalable** authentication system built using **MongoDB, Express.js, React, and Node.js (MERN)**.

## Features ✨
✅ User registration & login  
✅ Password hashing with **bcrypt**  
✅ JWT-based authentication  
✅ Role-based access control  
✅ Secure API routes  

## Technologies Used
- **Node.js**: The runtime environment for executing JavaScript on the server.
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing data.
- **Nodemailer**: A module for sending emails from Node.js applications.
- **Bcrypt**: A library for hashing passwords.

## Installation ⚙️

1. Clone the repository:
   ```bash
   git clone https://github.com/ruby-pilakhwal/Mern-Auth.git
   ```

2. Navigate to the project directory:
   ```bash
   cd mern-auth-system
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:
   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SENDER_EMAIL=your_email@example.com
   SENDER_PASSWORD=your_email_password
   ```

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. For development, you can use:
   ```bash
   npm run dev
   ```

3. Use Postman or any API client to test the endpoints:
   - **Register**: `POST /api/auth/register`
   - **Login**: `POST /api/auth/login`
   - **Logout**: `POST /api/auth/logout`

## API Endpoints

### Register
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
      "name": "Your Name",
      "email": "your_email@example.com",
      "password": "your_password"
  }
  ```

### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
      "email": "your_email@example.com",
      "password": "your_password"
  }
  ```

### Logout
- **URL**: `/api/auth/logout`
- **Method**: `POST`

## Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request. 

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Mention any resources, libraries, or individuals that helped you in the development of this project.
