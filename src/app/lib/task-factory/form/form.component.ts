import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ISubtask, ITaskModel } from '@lib/services/setup';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() ENewTaskCreated = new EventEmitter<ITaskModel>();

  @Input() form!: FormGroup;
  @Input() subtasks!: ISubtask[];

  constructor() { }

  ngOnInit(): void {
    this.form.reset();
  }

  logForm(): void {
    Object.entries(this.form.controls).forEach(x => {
      console.log(x[1].value)
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
