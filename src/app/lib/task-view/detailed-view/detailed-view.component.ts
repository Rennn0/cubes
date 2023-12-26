import { Component, Input } from '@angular/core';
import { ITaskModel } from '@lib/services/setup';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedVIewComponent {

  @Input() modelData!: ITaskModel;

  constructor() { }

}
