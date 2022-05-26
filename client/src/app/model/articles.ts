import { IRoom } from "./room";

export interface IArticles{
    id: number,
    room: IRoom,
    title: string,
    likes: number,
    body: string
}