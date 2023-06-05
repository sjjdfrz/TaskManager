![Task Manager Project](https://snacknation.com/wp-content/uploads/2020/12/Best-Task-Management-Software-Platforms.png)

<h3 align="center"><b>Task Manager Project</b></h3>

# 📖 Task Manager

This project is about building api for managing tasks and users.

## 🛠 Built With

* [AdonisJS](https://docs.adonisjs.com/guides/introduction) - The node.js framework used
* [MySQL](https://dev.mysql.com/doc/) - The databse used

## 💻 Getting Started
To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:

* At least the latest release of Node.js v14.

  https://nodejs.org/en/download

* MySQL

  https://www.mysql.com/downloads/

* Postman or Swagger

  https://www.postman.com/downloads/

  https://swagger.io/

### Setup

1) Clone this repository to your desired folder.
```
git clone https://github.com/sjjdfrz/managing_tasks.git
```
2) Create .env file.

3) Copy content of .env.example file and paste in .env file.
4) Fill variables of mysql with your own data.
```
MYSQL_HOST=
MYSQL_PORT=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DB_NAME=
```


### Install
Run this command to install dependencies:
```
npm install
```



### Usage

Run this command to create tables in your mysql schema.
```
node ace migration:run
```

To run the server, execute this command:
```
node ace serve --watch
```
or
```
npm run dev
```

After that you can do http requests with Postman(or Swagger)

* **Authentication api**:
```
  * Signup: http://127.0.0.1:3333/api/v1/signup/ [POST]
  * Login: http://127.0.0.1:3333/api/v1/login/ [POST]
  * Logout: http://127.0.0.1:3333/api/v1/logout/ [POST]
```

* **Users api**:

  First of all you must login as admin role. (For upload and download of file no need to be admin)
```
  * Get list of all users: http://127.0.0.1:3333/api/v1/users/ [GET]
  * Get user by ID: http://127.0.0.1:3333/api/v1/users/{ID} [GET]
  * Delete User by ID: http://127.0.0.1:3333/api/v1/users/{ID} [DELETE]
  * Update User by ID: http://127.0.0.1:3333/api/v1/users/{ID} [PATCH]
  * Upload file for user by ID: http://127.0.0.1:3333/api/v1/upload-user-file/{ID} [POST]
  * Download file for user by ID: http://127.0.0.1:3333/api/v1/downlaod-user-file/{ID} [GET]
```

* **Tasks api**:

  First of all you must login.
```
  * Get list of all tasks: http://127.0.0.1:3333/api/v1/tasks/ [GET]
  * Get task by ID: http://127.0.0.1:3333/api/v1/tasks/{ID} [GET]
  * Delete task by ID: http://127.0.0.1:3333/api/v1/tasks/{ID} [DELETE]
  * Update task by ID: http://127.0.0.1:3333/api/v1/tasks/{ID} [PATCH]
  * Upload file for task by ID: http://127.0.0.1:3333/api/v1/upload-task-file/{ID} [POST]
  * Download file for task by ID: http://127.0.0.1:3333/api/v1/downlaod-task-file/{ID} [GET]
  * Create task: 127.0.0.1:3333/api/v1/tasks/ [POST]
```

## Concepts:

* Authentication/Authorization (with JWT)
* Validation
* Pagination
* Upload/Download Files
* Sort
* Search
* ORM
* Schema migration
* etc
