import Route from '@ioc:Adonis/Core/Route';


Route.get('/users', 'UsersController.getAllUsers')
Route.get('/users/:id', 'UsersController.getUser')
//Route.post('/users', 'UsersController.createUser')
Route.delete('/users/:id', 'UsersController.deleteUser')
Route.patch('/users/:id', 'UsersController.updateUser')

Route.get('/tasks', 'TasksController.getAllTasks')
Route.get('/tasks/:id', 'TasksController.getTask')
Route.post('/tasks', 'TasksController.createTask')
Route.delete('/tasks/:id', 'TasksController.deleteTask')
Route.patch('/tasks/:id', 'TasksController.updateTask')


Route.post('signup', 'AuthController.signup')
Route.post('login', 'AuthController.login')
Route.post('logout', 'AuthController.logout')

Route.post('upload-task-file/:id', 'TasksController.uploadTaskFile')
Route.post('upload-user-file/:id', 'UsersController.uploadUserFile')

Route.get('download-user-file/:filename', 'UsersController.downloadUserFile')
