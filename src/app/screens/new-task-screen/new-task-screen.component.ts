import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task-screen',
  templateUrl: './new-task-screen.component.html',
  styleUrls: ['./new-task-screen.component.scss']
})
export class NewTaskScreenComponent implements OnInit {

  taskListId: string ='';
  constructor(private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {
      this.activatedRoute.params.subscribe(
        (params: Params) => {
          this.taskListId = params['taskListId'];
        }
      );
     }

  ngOnInit(): void {
  }

  addNewTask(title: string){
    if(title){
      this.taskService.createTaskInsideAtaskList(this.taskListId, title)
    .subscribe(()=> {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    });
     //console.log();
    }
    else return alert("Please Add a Task!");
   
  }

}
