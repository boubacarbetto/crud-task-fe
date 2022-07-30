import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import TaskListModel from './models/taskListModel';
import TaskModel from './models/taskModel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService: ApiConfigService) { }

  //to fetch all task lists
  //http://localhost:3000/tasklists/
  getAllTaskLists(): Observable<TaskListModel[]>{
    return this.apiConfigService.getTaskLists('tasklists');
  }
  //to fetch all tasks
  getAllTasks(taskListId: string): Observable<TaskModel[]>{
    return this.apiConfigService.getTasks(`tasklists/${taskListId}`);
  }

  //to fetch all tasks inside a task list object
  getAllTasksForATaskList(taskListId: string): Observable<TaskModel[]>{
    return this.apiConfigService.getTasks(`taskslists/${taskListId}/tasks`);
  }

  //create a task list bucket
  createTaskList(title: string): Observable<TaskListModel> {
    let data = {'title': title};
    return this.apiConfigService.post('tasklists', data);
  }

  //create a task inside a particular task list object
  createTaskInsideAtaskList(taskListId: string, title: string){
    let data = { 'title': title};
   return this.apiConfigService.post(`taskslists/${taskListId}/tasks`, {  title});
  }

  //delete a Task list
  deleteTaskList(taskListId: string):  Observable<TaskListModel> {
    return this.apiConfigService.delete(`tasklists/${taskListId}`);
  }

  //delete a task inside a Task list
  deleteATaskInsideATaskList(taskListId: string, taskId: string): Observable<TaskModel> {
    return this.apiConfigService.deleteTask(`taskslists/${taskListId}/tasks/${taskId}`);
  }

  //Update the status of a task whether its completed or not
  //http://localhost:3000/taskslists/62dfaa743d4519d31df06ff0/tasks/62e258b9fb73db0e7c75224a
  updateTaskStatus(taskListId: string, taskObject: TaskModel): Observable<TaskModel> {
    let updateData = { 'completed': !taskObject.completed}
    return this.apiConfigService.patch(`taskslists/${taskListId}/tasks/${taskObject._id}`, updateData);
  }

}
