import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '@lib/services/main.service';
import { ISubtask } from '@lib/services/setup';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //input data for TaskFactory
  for_TF_Form!: FormGroup;
  for_TF_Subtasks!: ISubtask[];
  //input data for Toolbox
  for_T_ProjectName: string = "random title"


  loading: boolean = true;
  displaySkeleton: boolean = true;

  constructor(private primeConfig: PrimeNGConfig, private _main: MainService) { }

  ngOnInit() {
    this.primeConfig.ripple = true;
    this.primeConfig.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100   // tooltip
    };
    this.for_TF_Form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      team: new FormControl([]),
      subtasks: new FormControl([]),
      description: new FormControl(''),
      selectedSubModules: new FormControl([]),
      techStack: new FormControl([])
    });
    this.for_TF_Subtasks = this._main.SeedData(); // mosashorebelia
  }

  onCloseLoading(name: string) {
    this.loading = false;
    this.for_T_ProjectName = name;
    setTimeout(() => {
      this.displaySkeleton = false;
    }, 1777);
  }
}
