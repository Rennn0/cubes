//angular 
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//primeNG
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AccordionModule } from 'primeng/accordion';
import { DragDropModule } from 'primeng/dragdrop';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton'
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { MessagesModule } from 'primeng/messages';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { RippleModule } from 'primeng/ripple';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AutoFocusModule } from 'primeng/autofocus';
//local components
import { TaskFactoryComponent } from "./task-factory/task-factory.component";
import { ToolboxComponent } from './toolbox/toolbox.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FormComponent } from './task-factory/form/form.component';
import { LoadingComponent } from './loading/loading.component';
import { MainService } from "./services/main.service";
import { DialogComponent } from './dialog/dialog.component';
import { TextPreloadComponent } from './loading/text-preload/text-preload.component';
import { AnimatedCubeComponent } from './loading/animated-cube/animated-cube.component';
import { DetailedVIewComponent } from './task-view/detailed-view/detailed-view.component';

@NgModule({
    declarations: [
        TaskFactoryComponent,
        ToolboxComponent,
        TaskViewComponent,
        NavigationBarComponent,
        FormComponent,
        LoadingComponent,
        DialogComponent,
        TextPreloadComponent,
        AnimatedCubeComponent,
        DetailedVIewComponent
    ],
    exports: [
        TaskFactoryComponent,
        ToolboxComponent,
        TaskViewComponent,
        NavigationBarComponent,
        LoadingComponent,
        AnimatedCubeComponent
    ],
    imports: [
        AutoCompleteModule,
        OverlayPanelModule,
        DynamicDialogModule,
        RippleModule,
        BrowserAnimationsModule,
        CommonModule,
        ToastModule,
        MessagesModule,
        AutoCompleteModule,
        ReactiveFormsModule,
        ToggleButtonModule,
        FormsModule,
        InputTextModule,
        ChipsModule,
        ProgressSpinnerModule,
        MultiSelectModule,
        InputTextareaModule,
        ButtonModule,
        ScrollPanelModule,
        AccordionModule,
        DragDropModule,
        ToolbarModule,
        SplitButtonModule,
        CardModule,
        SkeletonModule
    ],
    providers: [
        MainService
    ]
}) export class LibModule { }