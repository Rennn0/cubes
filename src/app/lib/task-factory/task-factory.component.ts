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
  @Input() subtasks!: ISubtask[];

  newTaskSwitch: boolean = true;

  existingTasks: ITaskModel[] = [];

  constructor(private _main: MainService) { }
  ngOnInit(): void {
    this.existingTasks.push({ description: "BLABLA asnm,d na,ასდაას დნ კ1 2 ", subtasks: [{ name: "hi", weight: 2 }], team: ["t1,t2"], title: " title1" });
    this.existingTasks.push({ description: "BLasjkhdasj", subtasks: [{ name: "hi", weight: 2 }], team: ["t1,t2"], title: " title2" });
    this.existingTasks.push({ description: "BLABLAasdasd", subtasks: [{ name: "hi", weight: 2 }], team: ["t1,t2"], title: " title3" });
    this.existingTasks.push({ description: "BLABLA1231 asd as", subtasks: [{ name: "hi", weight: 2 }], team: ["t1,t2"], title: " title4" });
    this.existingTasks.push({ description: "BLABLA asnm,d na,ასდაას დნ კ1 2 ", subtasks: [{ name: "hi", weight: 2 }], team: ["t1,t2"], title: " title1" });
    this.existingTasks.push({ description: "BLasjkhdasj", subtasks: [{ name: "hi", weight: 2 }], team: ["t1,t2"], title: " title2" });
    this.existingTasks.push({ description: "BLABLAasdasd", subtasks: [{ name: "hi", weight: 2 }], team: ["t1,t2"], title: " title3" });
    this.existingTasks.push({ description: "BLABLA1231 asd as", subtasks: [{ name: "hi", weight: 2 }], team: ["t1,t2"], title: " title4" });
    this.existingTasks.push({ description: "BLABLA asnm,d na,ასდაას დნ კ1 2 ", subtasks: [{ name: "hi", weight: 2 }], team: ["t1,t2"], title: " title1" });
    this.existingTasks.push({ description: "BLasjkhdasj", subtasks: [{ name: "hi", weight: 2 }], team: ["t1,t2"], title: " title2" });
    this.existingTasks.push({ description: "BLABLAasdasd", subtasks: [{ name: "hi", weight: 2 }], team: ["t1,t2"], title: " title3" });
    this.existingTasks.push({ description: "BLABLA1231 asd as", subtasks: [{ name: "hi", weight: 2 }], team: ["t1,t2"], title: " title4" });
  }

  onTaskModelCreated(newModel: ITaskModel): void {
    this.newTaskSwitch = true;
    this.existingTasks.push(newModel);
  }

  dragStart(model: ITaskModel): void {
    this._main.DragStarted(model);
  }

  dragEnd(): void {
    this._main.DragEnded();
  }
}
