import CreateTaskValidator from "App/Validators/CreateTaskValidator";
import Task from "App/Models/Task";

export default class TasksController {

  public async getAllTasks() {
    const tasks = await Task.all()
    return {
      status: 'success',
      tasks
    };
  }

  public async getTask({params}) {
    const task = await Task.find(params.id)

    return {
      status: 'success',
      task
    };
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
