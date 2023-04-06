import Route from '@ioc:Adonis/Core/Route';

Route.get('/api/v1/tasks', 'TasksController.getAllTasks').middleware('auth');
Route.get('/api/v1/tasks/:id', 'TasksController.getTask').where('id', /^[0-9]+$/).middleware('auth');
Route.post('/api/v1/tasks', 'TasksController.createTask').middleware('auth');
Route.delete('/api/v1/tasks/:id', 'TasksController.deleteTask').where('id', /^[0-9]+$/).middleware('auth');
Route.patch('/api/v1/tasks/:id', 'TasksController.updateTask').where('id', /^[0-9]+$/);
Route.post('/api/v1/upload-task-file/:id', 'TasksController.uploadTaskFile').where('id', /^[0-9]+$/).middleware('auth');
Route.get('/api/v1/download-task-file/:id', 'TasksController.downloadTaskFile').middleware('auth');

