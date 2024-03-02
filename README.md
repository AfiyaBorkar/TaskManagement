**MERN Stack Developer Assessment - Task Management Application**

### Project Overview:
The Task Management Application is a full-stack web application built with the MERN stack, allowing users to manage their tasks efficiently. It provides features for user authentication, task creation, viewing, updating, and deletion. The application utilizes MongoDB for data storage, Node.js and Express.js for the backend, and React.js for the frontend. 

### Requirements:
1. **Authentication**:
   - Users can sign up with a unique username and password.
   - Secure login and logout functionality are provided.

2. **Task Management**:
   - Authenticated users can create tasks with a title, description, and due date.
   - Users can view a list of their tasks.
   - Tasks can be updated (marked as completed, edited title/description/due date).
   - Users can delete tasks.

3. **Database**:
   - MongoDB is used for storing user information and tasks.

4. **Backend**:
   - Node.js and Express.js are utilized to build the server-side logic.
   - RESTful APIs are implemented for CRUD operations on tasks.

5. **Frontend**:
   - React.js is used for building the frontend.
   - Components are implemented for task display, creation/editing, and authentication forms.
   - React Router is used for navigation between different pages.

6. **State Management**:
   - Context is utilized for managing application state.

7. **Styling**:
   - CSS is used for styling the application with a focus on responsive design.

### Project Structure:
```
task-management-application/
│
├── backend/                   # Backend server code
│   ├── controllers/           # Route controllers for CRUD operations
│   ├── models/                # MongoDB models for users and tasks
│   ├── routes/                # API routes for tasks and authentication
│   ├── controllers/           # Functions of CRUD
│   ├── middleware/            # Authentication MiddlewareS
│   ├── config/                # Configuration files (e.g., token creation)
│   └── index.js               # Entry point for the backend server
│
├── frontend/                  # Frontend React application
│   ├── public/                # Static assets and index.html
│   ├── src/                   # Source files
│   │   └── Login.js           # Login application component
│   │   └── SignUp.js          # SignUp application component
│   │   └── TaskList.js        # Homepage application component
│   │   └── Toaster.js         # Message Alert component
│   │   └── mystyle.css        # Styling Sheet
│   │   └── App.js             # Main application component
│   │
│   ├── .env                   # Backend URL
│   ├── package.json           # Frontend dependencies and scripts
│
├── .env                       # mondodb url and jwt_token
├── README.md                  # Project overview, setup instructions, and documentation
└── .gitignore                 # Git ignore file
```

### Setup Instructions:
1. Clone the repository from [GitHub Repo Link](https://github.com/your-username/task-management-application).
2. Navigate to the project directory in your terminal.
3. Set up the backend server:
   - Navigate to the `backend/` directory.
   - Install backend dependencies using `npm install`.
   - create env file `.env` mentioned details like Mongodb Url and jwt_token.
   - Start the backend server using `npm start`.
4. Set up the frontend application:
   - Navigate to the `frontend/` directory.
   - Install frontend dependencies using `npm install`.
   - create env file `.env` mentioned details like Backend URL.
   - Start the frontend development server using `npm start`.
5. Once both backend and frontend servers are running, you can access the Task Management Application in your browser at `http://localhost:3000`.

### Additional Notes:
- This project demonstrates proficiency in full-stack development with the MERN stack.
- Demo : username: ABC and password: Brkr@345

### Credits:
- Developed by Afiya Borkar