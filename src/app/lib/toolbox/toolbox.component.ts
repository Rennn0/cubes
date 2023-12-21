import { Component, Input } from '@angular/core';
import { DialogComponent } from '@lib/dialog/dialog.component';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css'],
  providers: [DialogService]
})
export class ToolboxComponent {
  @Input() projectName: string = "";
  items: MenuItem[] | undefined;
  ref!: DynamicDialogRef;
  constructor(private _dialog: DialogService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Delete',
        icon: 'pi pi-times'
      }
    ];
  }

  openDialog() {
    this.ref = this._dialog.open(DialogComponent, {});
  }
}
