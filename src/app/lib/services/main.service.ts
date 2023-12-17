import { Injectable } from "@angular/core";
import { ISubtask, ITaskModel, TaskModel } from "./setup";

@Injectable({
    providedIn: "root"
}) export class MainService {
    private _dataToDrag: ITaskModel = new TaskModel();
    private _draggingIsActive: boolean = false;

    constructor() { }

    public SeedData(): ISubtask[] { // wasashlelia male
        return Array.from({ length: 10 }, (v: string, k) => ({ name: `Submodule ${k}`, weight: k }))
    }

    public DragStarted(data: ITaskModel): void { // call 1
        this._draggingIsActive = true;
        this._dataToDrag = data;
    }

    public DragEnded(): void { // if ok call 3 else 2
        this._draggingIsActive = false;
        this._dataToDrag = new TaskModel();
    }

    public Drop(): ITaskModel { // if ok call 2 else no call
        return this._dataToDrag;
    }
}