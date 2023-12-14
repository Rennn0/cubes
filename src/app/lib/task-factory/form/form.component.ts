import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ISubtask, ITaskModel } from '@lib/services/setup';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() ENewTaskCreated = new EventEmitter<ITaskModel>();

  @Input() form!: FormGroup;
  @Input() subtasks!: ISubtask[];

  items: any[] = [];
  techStack: { name: string, weight: number }[] = [
    { name: "C++", weight: 1 },
    { name: ".Net", weight: 1 },
    { name: "Node", weight: 1 },
    { name: "Angular", weight: 1 },
    { name: "React", weight: 1 },
    { name: "SQL", weight: 1 },
    { name: "Mongo", weight: 1 },
    { name: "Django", weight: 1 },
    { name: "Go", weight: 1 },
    { name: "C", weight: 1 }
  ]

  constructor() { }

  filterList(event: AutoCompleteCompleteEvent) {
    this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
  }
  ngOnInit(): void {
    this.form.reset();
  }

  logForm(): void {
    Object.entries(this.form.controls).forEach(x => {
      console.log(x[0], x[1].value)
    })
  }

  emitTaskModelCreated() {
    if (this.form.valid) {
      this.ENewTaskCreated.emit(this.form.value);
    } else {
      throw new Error("State of form is invalid");
    }
  }
}
