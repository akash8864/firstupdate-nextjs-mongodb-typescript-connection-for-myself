type Person = {firstName: string, lastName?:string}
export interface IUser  {
    name:Person,
    shortName:string,
    image:string,
    skills:string,
    status:string,
    role:string,
    lastActivity:Date,
    projects:string,
    createdBy:string,
    createdAt:Date,
    updatedBy:string,
    updatedAt:Date
} 