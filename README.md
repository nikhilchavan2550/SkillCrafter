# SkillCrafter

SkillCrafter is a cutting-edge web platform built with the MERN stack, designed to revolutionize collaborative learning and skill development. By fostering interactive connections between users, SkillCrafter creates an engaging environment for acquiring and sharing skills.

---

## 🚀 Motivation

SkillCrafter was envisioned to address the lack of interactive and practical learning methods in traditional platforms. Our goal is to provide a user-friendly space for skill-sharing, empowering users to learn from peers, mentor others, and build valuable connections.

---

## ✨ Features

- **Interactive Skill Sharing**: Connect with mentors or learners for one-on-one or group sessions.
- **Real-Time Communication**: Includes built-in chat and video conferencing for seamless interaction.
- **Secure Authentication**: Utilizes Google OAuth 2.0 and JSON Web Tokens (JWT) for secure access and data integrity.
- **User Feedback System**: Rate and review sessions to ensure high-quality learning experiences.
- **Fully Responsive Design**: Optimized for all devices for a smooth user experience.

---

## 🛠️ Technologies Used

### Frontend:
- React.js
- React Router
- React-Bootstrap
- Axios
- Socket.io-client

### Backend:
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JSON Web Token (JWT)
- Passport.js
- Socket.io

### Tools & Deployment:
- Docker and Docker Compose
- Google Cloud (OAuth Integration)
- MongoDB Compass
- Postman
- VS Code
- GitHub

---

## 🖼️ Screenshots

Screenshots of the project can be found in the `screenshots` folder.

---

## 🧹 Installation and Setup

Follow these steps to set up and run SkillCrafter locally or using Docker.

### Prerequisites
- Install Node.js and npm.
- Create a MongoDB Atlas database and get its connection URI.
- Generate Google OAuth credentials (Client ID and Secret).
- Optional: Set up Cloudinary for media storage (API key, secret, and cloud name).

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nikhilchavan2550/SkillCrafter.git
   cd SkillCrafter
   ```

2. **Frontend Setup**
   ```bash
   cd Frontend
   npm install
   ```

   Create a `.env` file in the `Frontend` directory:
   ```env
   VITE_LOCALHOST=http://localhost:8000
   VITE_SERVER_URL=<your-backend-deployment-url>
   ```

   Start the frontend:
   ```bash
   npm run dev
   ```
   The frontend will be running on `http://localhost:5173`.

3. **Backend Setup**
   ```bash
   cd ../Backend
   npm install
   ```

   Create a `.env` file in the `Backend` directory:
   ```env
   PORT=8000
   CORS_ORIGIN=*
   MONGODB_URI=<your-mongodb-connection-uri>
   JWT_SECRET=<your-jwt-secret>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   GOOGLE_CALLBACK_URL=http://localhost:8000/auth/google/callback
   CLOUDINARY_CLOUD_NAME=<your-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   ```

   Start the backend:
   ```bash
   npm run dev
   ```
   The backend will be running on `http://localhost:8000`.

4. **Run Using Docker**
   Create a `docker-compose.yml` file in the root directory with the following content:
   ```yaml
   version: '3'

   services:
     backend:
       build:
         context: .
         dockerfile: Dockerfile.backend
       ports:
         - "8000:8000"
       environment:
         - PORT=8000
         - CORS_ORIGIN=*
         - MONGODB_URI=<your-mongodb-connection-uri>
         - JWT_SECRET=<your-jwt-secret>
         - GOOGLE_CLIENT_ID=<your-google-client-id>
         - GOOGLE_CLIENT_SECRET=<your-google-client-secret>
         - GOOGLE_CALLBACK_URL=http://localhost:8000/auth/google/callback

     frontend:
       build:
         context: .
         dockerfile: Dockerfile.frontend
       ports:
         - "5173:5173"
       environment:
         - VITE_LOCALHOST=http://localhost:8000
         - VITE_SERVER_URL=<your-backend-deployment-url>
   ```

   Run the Docker Compose:
   ```bash
   docker-compose up
   ```

   To stop and remove Docker containers and images:
   ```bash
   docker-compose down --rmi all
   ```

---

## 🖍️ License

This project is licensed under the MIT License.

---

## 🔗 Connect

Feel free to reach out if you have any questions or want to contribute to this project!
```

