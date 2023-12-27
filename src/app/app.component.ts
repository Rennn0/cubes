import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '@lib/services/main.service';
import { FCTaskModel, ISubtask, ITaskModel } from '@lib/services/setup';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  //input data for TaskFactory
  for_TF_Form!: FormGroup<FCTaskModel>;
  for_TF_Subtasks!: ISubtask[];
  //input data for Toolbox
  projectName: string = "random title"


  loading: boolean = true;
  displaySkeleton: boolean = true;

  sidebarVisible = false;

  constructor(private primeConfig: PrimeNGConfig, private _main: MainService) { }

  ngOnInit() {
    this.primeConfig.ripple = true;
    this.primeConfig.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100   // tooltip
    };
    this.for_TF_Form = new FormGroup<FCTaskModel>({
      description: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      developers: new FormControl([]),
      subModules: new FormControl([]),
      techStack: new FormControl([])
    })
    this.for_TF_Subtasks = this._main.SeedData(); // ar gamoiyeneba
  }

  onCloseLoading(name: string) {
    this.loading = false;
    this.projectName = name;
    setTimeout(() => {
      this.displaySkeleton = false;
    }, 11111);
  }
}
