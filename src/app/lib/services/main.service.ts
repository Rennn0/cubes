import { Injectable } from "@angular/core";
import { ISubtask, ITaskModel, TaskModel } from "./setup";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
}) export class MainService {
    // cvladebi drag-drop qcevistvis taskfactorydan taskview_shi
    private _draggingIsActive: boolean = false;
    private _dataToDrag: ITaskModel = new TaskModel();
    private _dragedDataSubject: BehaviorSubject<ITaskModel[]> = new BehaviorSubject<ITaskModel[]>([]);
    public $dragedData: Observable<ITaskModel[]> = this._dragedDataSubject.asObservable();
    ///////

    constructor() { }

    public SeedData(): ISubtask[] { // ar gamoiyeneba
        return Array.from({ length: 10 }, (v: string, k) => ({ name: `Submodule ${k}`, weight: k }))
    }

    public DragStarted(data: ITaskModel): void { // call 1
        this._draggingIsActive = true;
        this._dataToDrag = data;
    }

    public DragEnded(): void { // if ok call 3 else 2
        if (this._draggingIsActive) {
            this._draggingIsActive = false;
            this._dataToDrag = new TaskModel();
        }
    }

    public Drop(): void { // if ok call 2 else no call
        if (this._draggingIsActive) {
            this._dragedDataSubject.next(this._dragedDataSubject.value.concat(this._dataToDrag));
            this._draggingIsActive = false;
            this._dataToDrag = new TaskModel();
        }
    }

    public RemoveFromModels(title: string) {
        this._dragedDataSubject.next(this._dragedDataSubject.value.filter(existing => existing.title !== title))
    }
}