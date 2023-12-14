import { Component } from '@angular/core';
import { MainService } from '@lib/services/main.service';
import { ITaskModel } from '@lib/services/setup';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent {
  taskModels: ITaskModel[] = [];

  constructor(private _main: MainService) { }

  Dropped() {
    this.taskModels.push(this._main.Drop());
  }

  RemoveFromModels(model: ITaskModel) {
    this.taskModels = this.taskModels.filter(x => x !== model)
  }
}
