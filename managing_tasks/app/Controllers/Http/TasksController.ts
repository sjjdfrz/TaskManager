import CreateTaskValidator from "App/Validators/CreateTaskValidator";
import Task from "App/Models/Task";
import Application from "@ioc:Adonis/Core/Application";
import Drive from "@ioc:Adonis/Core/Drive";

export default class TasksController {

  public async downloadTaskFile({params, response, auth}) {

    await auth.use('jwt').authenticate();

    const task = await Task.findOrFail(params.id);
    const location = task.photo;

    response.stream(await Drive.getStream(`tasks/${location}`));
  }


  public async uploadTaskFile({request, params, response, auth}) {

    await auth.use('jwt').authenticate();

    const file = request.file('file', {
      size: '100mb'
    });

    if (!file) {
      return response.status(404).json({
        status: 'fail',
        message: 'file is not found!'
      });
    }

    if (!file.isValid) {
      return response.status(415).json({
        status: 'fail',
        message: 'file is not valid!'
      });
    }

    await file.move(Application.tmpPath('uploads/tasks'));

    await Task
      .query()
      .where('id', params.id)
      .update({photo: file.fileName});

    response.status(200).json({
      status: 'success'
    });
  }


  public async getAllTasks({request, response, auth}) {

    await auth.use('jwt').authenticate();

    const page = request.all().page || 1;
    const sortBy = request.all().sort || 'created_at';
    const searchByName = request.all().name || '';

    let tasks;

    if (searchByName) {
      tasks = await Task
        .query()
        .where('name', searchByName)
        .orderBy(sortBy)
        .paginate(page, 5);
    } else {
      tasks = await Task
        .query()
        .orderBy(sortBy)
        .paginate(page, 5);
    }

    response.status(200).json({
      status: 'success',
      tasks
    });
  }


  public async getTask({params, response, auth}) {

    await auth.use('jwt').authenticate();

    const task = await Task.findOrFail(params.id);

    response.status(200).json({
      status: 'success',
      task
    });
  }


  public async createTask({request, response, auth}) {

    await auth.use('jwt').authenticate();

    const payload = await request.validate(CreateTaskValidator);

    const task = await Task.create(payload);

    response.status(200).json({
      status: 'success',
      task
    });
  }


  public async deleteTask({params, response, auth}) {

    await auth.use('jwt').authenticate();
    const task = await Task.findOrFail(params.id);
    await task.delete();

    response.status(200).json({
      status: 'success',
    });
  }


  public async updateTask({params, request, response, auth}) {

    await auth.use('jwt').authenticate();

    await Task
      .query()
      .where('id', params.id)
      .update({...request.all()});

    response.status(200).json({
      status: 'success',
    });
  }
}
