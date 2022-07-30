import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import TaskListModel from 'src/app/models/taskListModel';
import TaskModel from 'src/app/models/taskModel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.scss']
})
export class TaskScreenComponent implements OnInit {

  taksLists: TaskListModel[] = [];
  tasks: TaskModel[] = [];
  taskListId: string = '';

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    //debugger;
    this.taskService.getAllTaskLists()
    .subscribe(allTaskLists => {
      this.taksLists = allTaskLists;
    //get the 1st task list id and route to it on page load
    //this.router.navigate(['task-list', this.taksLists[0]['_id']]);
    });

    this.activatedRoute.params.subscribe(
      (params: Params) => {
         this.taskListId = params['taskListId'];
        if(this.taskListId){
          this.taskService.getAllTasksForATaskList(this.taskListId).subscribe(
            (tasks: TaskModel[]) => this.tasks = tasks
          );
          
        }  
      }
    );
  }

  taskClicked(task: TaskModel) {
    //console.log(task);
    this.taskService.updateTaskStatus(this.taskListId, task)
    .subscribe(() => task.completed = !task.completed);
  }

  deleteTask(task: TaskModel) {
    //console.log(task);
    this.taskService.deleteATaskInsideATaskList(this.taskListId, task._id)
    .subscribe(
      (taskkDeleted: TaskModel) => {
        this.tasks = this.tasks.filter(t => t._id != taskkDeleted._id);
      }
    );
  }

  deleteTaskList(taskListClicked: TaskListModel) {
    this.taskService.deleteTaskList(taskListClicked._id)
    .subscribe(
      () => {
        this.taksLists = this.taksLists.filter(tL => tL._id != taskListClicked._id);
      }
    );
  }

  addNewTask(){
    if(this.taskListId) {
      // route the user to add task for the selected task-list
      this.router.navigate(['./new-task'], { relativeTo: this.activatedRoute });
    } 
    else return alert("Please select a Task List !");
  }

}
function subscribe(arg0: (tasks: TaskModel[]) => TaskModel[]) {
  throw new Error('Function not implemented.');
}

