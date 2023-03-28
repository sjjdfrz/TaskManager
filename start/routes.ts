import Route from '@ioc:Adonis/Core/Route';

Route.get('/api/v1/users', 'UsersController.getAllUsers');
Route.get('/api/v1/users/:id', 'UsersController.getUser').where('id', /^[0-9]+$/);
Route.delete('/api/v1/users/:id', 'UsersController.deleteUser').where('id', /^[0-9]+$/);
Route.patch('/api/v1/users/:id', 'UsersController.updateUser').where('id', /^[0-9]+$/);

Route.get('/api/v1/tasks', 'TasksController.getAllTasks');
Route.get('/api/v1/tasks/:id', 'TasksController.getTask').where('id', /^[0-9]+$/);
Route.post('/api/v1/tasks', 'TasksController.createTask');
Route.delete('/api/v1/tasks/:id', 'TasksController.deleteTask').where('id', /^[0-9]+$/);
Route.patch('/api/v1/tasks/:id', 'TasksController.updateTask').where('id', /^[0-9]+$/);

Route.post('/api/v1/signup', 'AuthController.signup');
Route.post('/api/v1/login', 'AuthController.login');
Route.post('/api/v1/logout', 'AuthController.logout');

Route.post('/api/v1/upload-task-file/:id', 'TasksController.uploadTaskFile').where('id', /^[0-9]+$/);
Route.post('/api/v1/upload-user-file/:id', 'UsersController.uploadUserFile').where('id', /^[0-9]+$/);

Route.get('/api/v1/download-user-file/:id', 'UsersController.downloadUserFile');
Route.get('/api/v1/download-task-file/:id', 'TasksController.downloadTaskFile');
