import { IDeveloper, ISubModule, ISkill } from "./setup"

export function SeedData() {
    const skills = [
        "C++", ".Net", "Node",
        "Angular", "React", "SQL",
        "Mongo", "Django", "Go",
        "C",
    ]

    const subModules = [
        "Auth", "REST api",
        "GraphQL", "GRPC", "DB",
        "Microservices", "Payments"
    ]

    return {
        Skills: (): ISkill[] => {
            return skills.map(skill => ({ name: skill, K: parseFloat((Math.random() * 10).toFixed(2)) }))
        },
        SubModules: (): ISubModule[] => {
            return subModules.map(sm => ({ name: sm, importance: parseFloat((Math.random() * 3).toFixed(4)) }))
        },
        Developers: (): IDeveloper[] => {
            return Array.from({ length: 10 }, (v, k) =>
            ({
                workedOn: [
                    { name: subModules[Math.floor(Math.random() * subModules.length)] },
                    { name: subModules[Math.floor(Math.random() * subModules.length)] },
                ],
                skills: [
                    { name: skills[Math.floor(Math.random() * skills.length)] },
                    { name: skills[Math.floor(Math.random() * skills.length)] }
                ],
                name: `Dev ${k}`
            }))
        }
    }
}