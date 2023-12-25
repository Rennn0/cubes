import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SeedData } from '@lib/services/raw.data';
import { FCTaskModel, IDeveloper, ISkill, ISubtask, ITaskModel } from '@lib/services/setup';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [MessageService]
})
export class FormComponent implements OnInit {
  @Output() ENewTaskCreated = new EventEmitter<ITaskModel>();

  @Input() form!: FormGroup<FCTaskModel>;
  @Input() subtasks!: ISubtask[]; // ar gamoiyeneba

  private _data;
  private _developers: IDeveloper[];

  subModules: string[] = [];
  skills: ISkill[] = [];
  suggestDevs: string[] = []
  constructor(private _messageService: MessageService) {
    this._data = SeedData();
    this.skills = this._data.Skills();
    this._developers = this._data.Developers();
  }

  filterList(event: AutoCompleteCompleteEvent) {
    this.subModules = this._data.SubModules()
      .map(x => x.name)
      .filter(x => x.toLowerCase().includes(event.query.toLocaleLowerCase()));
    if (event.query != "")
      this.subModules.push(event.query)
  }

  FilterDevList(event: AutoCompleteCompleteEvent) {
    // console.log(this._developers);
    // console.log(this.suggestDevs);
    this.suggestDevs = this._developers
      .filter(dev =>
        dev.skills.some(x => this.form.value.techStack?.some((y: ISkill) => x.name === y.name))
        ||
        dev.workedOn.some(x => this.form.value.subModules?.some((y: string) => x.name === y))
      )
      .map(x => x.name)

    //vigac sxvisi saxeli
    if (event.query !== "")
      this.suggestDevs.unshift(event.query);
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
    console.log(this.suggestDevs);
  }

  emitTaskModelCreated() {
    if (this.form.valid) {
      const form = this.form.value;

      const newForm: ITaskModel = {
        title: form.title,
        description: form.description,
        subModules: form.subModules?.map((value: string) => ({
          name: value, K: 1 // es gasasworebeli iqneba mere 
        })),
        techStack: form.techStack,
        developers: this._developers.filter(dev => form.developers.includes(dev.name))
      }

      this.ENewTaskCreated.emit(newForm);
    } else {
      this._messageService.add({ key: 'tl', severity: 'info', summary: 'Oops', detail: 'Fill required fields' })
    }
  }
}
