import { IRoom } from "./room";
import { IUser } from "./user";

export interface IComments{
    room: IRoom,
    user: IUser,
    body: string,
    likes: number
    create: Date,
    update: Date
}