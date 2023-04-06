import CreateTaskValidator from "App/Validators/CreateTaskValidator";
import Task from "App/Models/Task";
import Application from "@ioc:Adonis/Core/Application";
import Drive from "@ioc:Adonis/Core/Drive";
import {rules, schema} from "@ioc:Adonis/Core/Validator";

export default class TasksController {

  // send success responses to client
  public sendResponse(response, status, statusCode, message, data?: object) {
    response.status(statusCode).json({
      status,
      statusCode,
      message,
      data,
    });
  }


  public validateFile(request, response) {

    // validation file
    const file = request.file('file', {
      size: '100mb'
    });

    // if there is no file
    if (!file) {

      this.sendResponse(
        response,
        'fail',
        404,
        'File is not found!',
      );
    }

    // validation of file failed
    if (!file.isValid) {

      this.sendResponse(
        response,
        'fail',
        415,
        'File is not valid!',
      );
    }
    return file;
  }


  public async validateUpdatedTask(request) {

    // validation
    const updateSchema = schema.create({

      name: schema.string.optional([
        rules.alpha(),
        rules.trim(),
        rules.escape()
      ]),

      priority: schema.enum(['high', 'medium', 'low'] as const)
    });

    await request.validate({schema: updateSchema});
  }


  // download task file by its ID
  public async downloadTaskFile({params, response}) {

    // find task from database by ID
    const task = await Task.findOrFail(params.id);

    // the photo property of each task is the name of file(photo)
    const location = task.photo;

    // streaming file
    response.stream(await Drive.getStream(`tasks/${location}`));
  }


  public async uploadTaskFile({request, params, response}) {

    const file = this.validateFile(request, response);

    // store file to tmp/uploads/tasks folder
    await file.move(Application.tmpPath('uploads/tasks'));

    // save the name of file in database
    await Task
      .query()
      .where('id', params.id)
      .update({photo: file.fileName});

    this.sendResponse(
      response,
      'success',
      200,
      'File uploaded successfully.',
      file
    );
  }


  public async getAllTasks({request, response}) {

    /*
      this function is for send back all tasks.
      also we can paginate, sort and search tasks.
      the sorting is default by "created_at" property
      and searching can be done only by "name" property.
     */

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

    this.sendResponse(
      response,
      'success',
      200,
      'Sending list of all tasks to client successfully.',
      tasks
    );
  }


  // send back task by ID to client
  public async getTask({params, response}) {

    const task = await Task.findOrFail(params.id);

    this.sendResponse(
      response,
      'success',
      200,
      'Sending the task to client successfully.',
      task
    );
  }


  // create new task
  public async createTask({request, response}) {

    // validation
    const payload = await request.validate(CreateTaskValidator);

    const task = await Task.create(payload);

    this.sendResponse(
      response,
      'success',
      201,
      'Create new task successfully.',
      task
    );
  }


  // delete specific task by ID
  public async deleteTask({params, response}) {

    const task = await Task.findOrFail(params.id);
    await task.delete();

    this.sendResponse(
      response,
      'success',
      202,
      'Deleting the task successfully.'
    );
  }


  // update name,priority of specific task by ID
  public async updateTask({params, request, response}) {

    await this.validateUpdatedTask(request);

    await Task
      .query()
      .where('id', params.id)
      .update({...request.all()});

    this.sendResponse(
      response,
      'success',
      200,
      'Updating the task successfully.'
    );
  }
}
