# Task Manager --- Project Overview

## 1. Project purpose

Build a Task Manager application as a learning project using the MERN
stack:

-   **MongoDB** --- database
-   **Express.js** --- backend web framework
-   **React** --- frontend user interface
-   **Node.js** --- JavaScript runtime

The project is being rebuilt from scratch as a clean, beginner-friendly
application. The previous backend repository is reference material only;
this blueprint does not assume that any of its code has been reused.

The main learning goal is to understand how a complete application is
designed and built, not simply to copy code. Development will proceed
one small step at a time, with explanations, coding exercises, reviews,
and tests.

## 2. Planned application features

### Authentication

-   Register a user account.
-   Log in and log out.
-   Hash passwords with bcrypt.
-   Authenticate requests with a JWT stored in an HTTP-only cookie.
-   Retrieve the currently authenticated user's information.

### Task management

-   Create a task.
-   View the current user's tasks.
-   View one task.
-   Update a task.
-   Mark a task complete or incomplete.
-   Delete a task.
-   Clear completed tasks.

### Dashboard

-   Display the user's tasks.
-   Show the total number of tasks.
-   Show completed and pending task counts.

The dashboard and frontend features are planned. They should be
implemented during the frontend phase, after the backend foundation is
working.

## 3. Initial project scope

Keep the first version focused. It will have one user role and basic
task management.

Not included in the initial version:

-   Admin roles or an admin dashboard
-   Password reset and email verification
-   Social login
-   Task sharing between users
-   File attachments
-   Notifications
-   Advanced analytics
-   Categories, priorities, and due dates

These features can be reconsidered after the core application works.

## 4. Data models

### User model

Planned fields:

  Field         Type     Rules / purpose
  ------------- -------- ------------------------------------------------
  `name`        String   User's name
  `email`       String   Required and unique
  `password`    String   Store a bcrypt password hash, never plain text
  `createdAt`   Date     Creation timestamp

The password hash must never be sent to the frontend in API responses.

### Task model

Planned fields:

  Field           Type       Rules / purpose
  --------------- ---------- ---------------------------------------
  `taskName`      String     Required
  `description`   String     Optional
  `note`          String     Optional
  `done`          Boolean    Defaults to `false`
  `user`          ObjectId   Required reference to the owning User
  `createdAt`     Date       Creation timestamp
  `updatedAt`     Date       Last-update timestamp

Use Mongoose timestamps to manage `createdAt` and `updatedAt`.

A user can own many tasks. Each task stores a reference to its owner
through the `user` field.

**Important ownership rule:** the backend must identify the owner from
the verified authentication token. It must not trust a user ID supplied
by the frontend. A user must only be able to read, update, or delete
their own tasks.

## 5. Planned folder structure

This is the intended starting structure. It can be adjusted when there
is a clear learning or technical reason.

``` text
task-manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── TaskForm.jsx
    │   │   ├── TaskList.jsx
    │   │   ├── TaskItem.jsx
    │   │   └── TaskStats.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── services/
    │   │   ├── authService.js
    │   │   └── taskService.js
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    └── package.json
```

## 6. Planned API endpoints

### Authentication routes

  -----------------------------------------------------------------------
  Method                  Endpoint                Purpose
  ----------------------- ----------------------- -----------------------
  `POST`                  `/api/auth/register`    Register a user

  `POST`                  `/api/auth/login`       Log in and set the
                                                  authentication cookie

  `POST`                  `/api/auth/logout`      Clear the
                                                  authentication cookie

  `GET`                   `/api/auth/me`          Get the currently
                                                  authenticated user
  -----------------------------------------------------------------------

### Task routes

  ---------------------------------------------------------------------------
  Method                  Endpoint                    Purpose
  ----------------------- --------------------------- -----------------------
  `POST`                  `/api/tasks`                Create a task

  `GET`                   `/api/tasks`                Get the current user's
                                                      tasks

  `GET`                   `/api/tasks/:id`            Get one task owned by
                                                      the current user

  `PUT`                   `/api/tasks/:id`            Update an owned task

  `PATCH`                 `/api/tasks/:id/complete`   Toggle task completion

  `DELETE`                `/api/tasks/:id`            Delete an owned task

  `DELETE`                `/api/tasks/completed`      Delete the current
                                                      user's completed tasks
  ---------------------------------------------------------------------------

Register the static `/completed` route before the dynamic `/:id` route
so that Express does not interpret `completed` as an ID.

All task endpoints must enforce ownership. Protected endpoints must
reject requests without valid authentication.

## 7. Development roadmap

The backend comes first, as decided for this project.

### Phase A --- Backend foundation

1.  Create the backend folder and initialize npm.
2.  Install and configure Express.
3.  Create the server and understand the request/response lifecycle.
4.  Add middleware and route files.
5.  Connect MongoDB using Mongoose.
6.  Create the User and Task schemas.
7.  Build basic task CRUD and understand each operation.
8.  Test the CRUD endpoints with Postman.

### Phase B --- Authentication and authorization

9.  Build user registration.
10. Hash passwords with bcrypt.
11. Build login and compare passwords safely.
12. Issue a JWT in an HTTP-only cookie.
13. Build logout and the current-user endpoint.
14. Create authentication middleware to verify the cookie.
15. Protect task routes.
16. Enforce task ownership on every individual-task operation.
17. Add input validation and consistent error handling.
18. Test successful and unsuccessful cases in Postman.

### Phase C --- Frontend foundations

19. Create the React frontend.
20. Understand the Vite/React project structure and component flow.
21. Build the initial interface using local React state before
    connecting the API.
22. Practice controlled inputs and event handlers.
23. Practice conditional rendering, rendering lists with `map`,
    filtering with `filter`, and immutable state updates.
24. Add task creation, completion, editing, and deletion using local
    state.
25. Add React Router for page navigation.

### Phase D --- API integration

26. Learn `useEffect` and its dependency array.
27. Create frontend service functions for authentication and tasks.
28. Connect React to the Express API.
29. Send cookies with requests where required.
30. Add loading, success, and error states.
31. Connect registration, login, logout, and the dashboard.
32. Verify that users only see and manage their own tasks.

### Phase E --- Testing and deployment

33. Test the main user journeys from registration through task
    management.
34. Test invalid input, missing authentication, nonexistent tasks, and
    cross-user access attempts.
35. Prepare environment variables for deployment.
36. Deploy the backend and frontend.
37. Verify cookie, CORS, and HTTPS settings in production.

This roadmap is a plan, not a statement that these features have already
been implemented.

## 8. Security and quality requirements

-   Hash passwords with bcrypt; never store plain-text passwords.
-   Keep secrets and database credentials in environment variables.
-   Do not commit `.env` files.
-   Use a strong, private JWT secret.
-   Set authentication cookies as `httpOnly`.
-   Configure `secure` appropriately: local HTTP development differs
    from HTTPS production.
-   Configure `sameSite` and CORS deliberately for the frontend/backend
    deployment arrangement.
-   Enable credentialed requests when using cookie authentication across
    the frontend and backend.
-   Never return password hashes in API responses.
-   Validate incoming data on the backend.
-   Check whether a task exists before trying to use its fields.
-   Enforce task ownership in database queries and update/delete
    operations.
-   Return appropriate HTTP status codes and safe error messages. Do not
    expose raw internal errors to users.

## 9. Testing checklist

### Authentication

-   Register with valid details.
-   Reject missing or invalid registration details.
-   Reject duplicate email addresses.
-   Verify that passwords are hashed.
-   Log in with correct credentials.
-   Reject incorrect credentials.
-   Verify that protected routes reject unauthenticated requests.
-   Verify logout clears the cookie.

### Tasks

-   Create a task with the required task name.
-   Confirm optional description and note can be omitted.
-   Confirm `done` defaults to `false`.
-   List only the authenticated user's tasks.
-   Read, update, complete, and delete an owned task.
-   Handle invalid task IDs and nonexistent tasks.
-   Confirm one user cannot read, update, or delete another user's task.
-   Clear completed tasks without affecting another user's tasks.

### Frontend

-   Validate form behavior.
-   Confirm state updates correctly after each task action.
-   Show useful loading and error feedback.
-   Confirm login/logout and protected page behavior.
-   Confirm the UI stays consistent with API responses.

## 10. Learning workflow

For each feature, follow this process:

1.  **Understand the concept:** explain the problem the feature solves.
2.  **See a small example:** use a short demonstration when it helps.
3.  **Write the code:** build it yourself in small steps.
4.  **Review:** inspect the code and explain any mistakes.
5.  **Test:** use Postman or the browser to verify behavior.
6.  **Explain it back:** describe the important decisions and how the
    code works.

Do not generate the entire application at once. Work on one concept or
task at a time. Understand why each file exists, what it is responsible
for, and how it communicates with other files.

Use arrow-function components for React components.

## 11. Definition of done

The first version is complete when:

-   A user can register, log in, and log out.
-   Authentication is enforced by the backend.
-   A user can create, view, update, complete, and delete their own
    tasks.
-   Users cannot access another user's tasks.
-   The React frontend communicates with the backend.
-   The dashboard shows task data and basic task statistics.
-   Main success and failure cases have been tested.
-   The application can be deployed with environment-specific
    configuration.
-   The developer can explain the main flow from React UI to API route,
    controller, model, and MongoDB---and back.
