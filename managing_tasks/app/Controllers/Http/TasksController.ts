import CreateTaskValidator from "App/Validators/CreateTaskValidator";
import Task from "App/Models/Task";
import Application from "@ioc:Adonis/Core/Application";
import Drive from "@ioc:Adonis/Core/Drive";

export default class TasksController {

  public async downloadTaskFile({params, response}) {
    const location = `${params.filename}`
    console.log(location)
    response.stream(await Drive.getStream(location))
  }

  public async uploadTaskFile({request, params, response}) {
    const file = request.file('file',{
      size: '5mb',
      extnames: ['jpg', 'png', 'gif'],
    })

    if (file && file.isValid) {
      await file.move(Application.tmpPath('uploads'))

      await Task
        .query()
        .where('id', params.id)
        .update({ photo: file.fileName })

      response.status(200).json({
        status: 'success'
      })
    } else {
      response.status(404).json({
        status: 'fail',
        message: 'file not found or is not valid.'
      })
    }
  }

  public async getAllTasks({request}) {

    const page = request.all().page || 1

    const tasks = await Task.query().paginate(page,5)
    return {
      status: 'success',
      tasks
    };
  }

  public async getTask({params, response}) {
    const task = await Task.find(params.id)

    response.status(200).json({
      status: 'success',
      task
    });
  }


  public async createTask({request}) {

    const payload = await request.validate(CreateTaskValidator)

    const task = await Task.create(payload)

    return {
      status: 'success',
      task
    };
  }

  public async deleteTask({params}) {
    const task = await Task.find(params.id)
    if (task) await task.delete()

    return {
      status: 'success'
    };
  }

  public async updateTask({params, request}) {

    const payload = await request.validate(CreateTaskValidator)

    await Task
      .query()
      .where('id', params.id)
      .update({...payload})

    return {
      status: 'success'
    };
  }

}
