export interface ISubtask {
    name: string,
    weight: number
}
export interface ITaskModel {
    title: string,
    team: string[],
    subtasks: ISubtask[],
    description: string
}

export class TaskModel implements ITaskModel {
    title: string
    team: string[]
    subtasks: ISubtask[]
    description: string
    constructor() {
        this.title = "";
        this.team = [];
        this.subtasks = [];
        this.description = ""
    }
}