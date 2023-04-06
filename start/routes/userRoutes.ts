import Route from '@ioc:Adonis/Core/Route';

Route.get('/api/v1/users', 'UsersController.getAllUsers').middleware(['auth', 'restrict']);
Route.get('/api/v1/users/:id', 'UsersController.getUser').where('id', /^[0-9]+$/).middleware(['auth', 'restrict']);
Route.delete('/api/v1/users/:id', 'UsersController.deleteUser').where('id', /^[0-9]+$/).middleware(['auth', 'restrict']);
Route.patch('/api/v1/users/:id', 'UsersController.updateUser').where('id', /^[0-9]+$/).middleware(['auth', 'restrict']);
Route.post('/api/v1/signup', 'AuthController.signup');
Route.post('/api/v1/login', 'AuthController.login');
Route.post('/api/v1/logout', 'AuthController.logout');
Route.get('/api/v1/download-user-file/:id', 'UsersController.downloadUserFile').middleware(['auth', 'restrict']);
Route.post('/api/v1/upload-user-file/:id', 'UsersController.uploadUserFile').where('id', /^[0-9]+$/).middleware(['auth', 'restrict']);


