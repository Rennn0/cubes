import { Component } from '@angular/core';
import { MainService } from '@lib/services/main.service';
import { ITaskModel } from '@lib/services/setup';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent {
  taskModels: Observable<ITaskModel[]>;

  constructor(private _main: MainService) {
    this.taskModels = this._main.$dragedData;
  }

  Dropped() {
    this._main.Drop();
  }

  RemoveFromModels(title: string) {
    this._main.RemoveFromModels(title);
  }
}
