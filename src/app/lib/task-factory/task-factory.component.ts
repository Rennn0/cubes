import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MainService } from '@lib/services/main.service';
import { ISubtask, ITaskModel } from '@lib/services/setup';

@Component({
  selector: 'app-task-factory',
  templateUrl: './task-factory.component.html',
  styleUrls: ['./task-factory.component.css']
})
export class TaskFactoryComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() subtasks!: ISubtask[]; // ar gamoiyeneba

  newTaskSwitch: boolean = true;

  // existingTasks: ITaskModel[] = []; 

  constructor(private _main: MainService) { }
  ngOnInit(): void {
    this._main.AddModel(
      {
        description: "initial",
        developers: [
          {
            name: "Luka",
            skills: [
              { name: "C++", K: 9.99, matching: true }
            ],
            workedOn: [{ name: "some stuff", importance: 1 }]
          }
        ],
        subModules: [{ name: "random module", importance: 1 }],
        techStack: [{ name: "c++", K: 9.99, matching: true }, { name: "Angular", K: 8.88 }],
        title: "random title"
      });
    this._main.AddModel(
      {
        description: "initial @",
        developers: [
          {
            name: "Beqa",
            skills: [
              { name: "C#", K: 6.66 }
            ],
            workedOn: [{ name: "particle system", importance: 1.3, matching: true }]
          }
        ],
        subModules: [{ name: "particle system", importance: 2, matching: true }],
        techStack: [{ name: "c++", K: 9.99 }, { name: "C#", K: 8.88 }],
        title: "Hushh"
      })
  }

  onTaskModelCreated(newModel: ITaskModel): void {
    this.newTaskSwitch = true;

    // this.existingTasks.push(newModel);
    // console.log(this.existingTasks)

    this._main.AddModel(newModel);
  }

  dragStart(model: ITaskModel): void {
    this._main.DragStarted(model);
  }

  dragEnd(): void {
    this._main.DragEnded();
  }
}
