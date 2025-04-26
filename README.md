# MERN Authentication System 🚀

A **secure** and **scalable** authentication system built using **MongoDB, Express.js, React, and Node.js (MERN)**.

## Features ✨
✅ User registration & login  
✅ Password hashing with **bcrypt**  
✅ JWT-based authentication  
✅ Role-based access control  
✅ Secure API routes  
✅ Email verification system  
✅ Password reset functionality with OTP  
✅ Responsive UI with Vite and React Router v6

## Technologies Used
- **Node.js**: The runtime environment for executing JavaScript on the server.
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing data.
- **React**: Frontend library for building user interfaces.
- **Vite**: Next generation frontend tooling.
- **React Router v6**: Modern routing solution for React applications.
- **Nodemailer**: A module for sending emails from Node.js applications.
- **Bcrypt**: A library for hashing passwords.
- **Toastify**: A lightweight notification library for React.

## Installation ⚙️

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.0 or higher)
- npm or yarn

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/ruby-pilakhwal/Mern-Auth.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Mern-Auth
   ```

3. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

4. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

5. Create a `.env` file in both server and client directories:
   - In `server/.env`:
   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SENDER_EMAIL=your_email@example.com
   SENDER_PASSWORD=your_email_password
   ```
   - In `client/.env`:
   ```plaintext
   VITE_API_URL=http://localhost:5000
   ```

### Running the Application

1. Start the server:
   ```bash
   cd server
   npm start
   ```

2. Start the client in a new terminal:
   ```bash
   cd client
   npm run dev
   ```

## Available Routes

### Server Routes
- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Logout**: `POST /api/auth/logout`
- **Send Verify OTP**: `POST /api/auth/send-verify-otp`
- **Verify Account**: `POST /api/auth/verify-account`
- **Send Reset OTP**: `POST /api/auth/send-reset-otp`
- **Verify Reset OTP**: `POST /api/auth/verify-reset-otp`
- **Reset Password**: `POST /api/auth/reset-password`
- **Check Authentication**: `GET /api/auth/is-auth`

### Client Routes
- `/` - Home Page
- `/login` - Login Page
- `/register` - Registration Page
- `/verify-email` - Email Verification Page
- `/reset-password` - Password Reset Page

## Usage

1. Register a new user by providing name, email, and password
2. Verify your email using the OTP sent to your email address
3. Login with your credentials
4. Reset your password if needed using the password reset functionality

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to the creators of MERN stack technologies
- Thanks to the contributors of open-source libraries used in this project
- Thanks to the community for providing valuable feedback and support
