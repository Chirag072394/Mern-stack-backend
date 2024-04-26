import {Request,Response ,NextFunction} from 'express'
export interface NewUserRequestBody{
    name:string;
    email:string;
    photo:string;
    gender:string;
    _id:number;
    dob:Date;

}

export type ControllerType=(req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>