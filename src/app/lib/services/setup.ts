import { FormControl } from "@angular/forms"

export interface ISubtask {
    name: string,
    weight: number
}

export interface ITaskModel {
    title: string,
    description: string,
    subModules: ISubModule[],
    techStack: ISkill[],
    developers: IDeveloper[],
}
export interface FCTaskModel {
    title: FormControl,
    description: FormControl,
    subModules: FormControl,
    developers: FormControl,
    techStack: FormControl,
}

export interface ISkill {
    name: string,
    K?: number,
    matching?: boolean
}

export interface ISubModule {
    name: string,
    importance?: number,
    matching?: boolean
}

export interface IDeveloper {
    skills: ISkill[],
    workedOn: ISubModule[],
    name: string
}

export class TaskModel implements ITaskModel {
    title: string
    description: string
    subModules: ISubModule[]
    developers: IDeveloper[]
    techStack: ISkill[]
    constructor() {
        this.title = "";
        this.description = "";
        this.subModules = [];
        this.developers = [];
        this.techStack = [];
    }
}