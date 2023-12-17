import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SeedData } from '@lib/services/raw.data';
import { IDeveloper, ISkill, ISubtask, ITaskModel } from '@lib/services/setup';
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

  private _data;

  subModules: string[] = [];
  skills: ISkill[] = [];
  developers: IDeveloper[] = [];
  devNames: string[] = []
  constructor() {
    this._data = SeedData();
    this.skills = this._data.Skills();
  }

  filterList(event: AutoCompleteCompleteEvent) {
    this.subModules = this._data.SubModules()
      .map(x => x.name)
      .filter(x => x.toLowerCase().includes(event.query.toLocaleLowerCase()));
    if (event.query != "")
      this.subModules.push(event.query)
  }

  FilterDevList(event: AutoCompleteCompleteEvent) {
    // yovel jerze axali sia iqmndeba amito gansxvavebul devebs amoyris ar inerviulo 
    this.developers = this._data.Developers()
      .filter(dev =>
        dev.skills.some(x => this.form.value.techStack?.some((y: ISkill) => x.name === y.name))
        ||
        dev.workedOn.some(x => this.form.value.selectedSubModules?.some((y: string) => x.name === y))
      );

    this.devNames = this.developers.map(x => x.name)

    //vigac sxvisi saxeli
    if (event.query !== "")
      this.devNames.push(event.query);
  }

  ngOnInit(): void {
    this.form.reset();
  }

  logForm(): void {
    console.log(this.form.value)
    Object.entries(this.form.controls).forEach(x => {
      console.log(x[0], x[1].value)
    })
    console.log(this.skills);
    console.log(this.developers);
  }

  emitTaskModelCreated() {
    if (this.form.valid) {
      this.ENewTaskCreated.emit(this.form.value);
    } else {
      throw new Error("State of form is invalid");
    }
  }
}
