import { Observable } from "rxjs"
import { IFollowed } from "./followed"

export interface IRoom{
  name: string,
  description?: string,
  picture?: string
  isFollowed?: Observable<Boolean>
}