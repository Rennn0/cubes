import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements AfterViewInit {

  @ViewChild("myCanvas", { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngAfterViewInit(): void {

  }
}
