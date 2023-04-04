import { User } from 'models/User';

export interface Room {
  is_followed: boolean | null;
  name: string;
  description: string;
  picture: string;
}

export interface RoomChat {
  room: string;
  user: User;
  message: string;
  sent_time: Date;
}

export interface RoomQuery {
  nrOfObjects: number;
  rooms: Room[];
}

export interface RoomSearch {
  room_id: string;
  followers_nr: number;
}

export interface Follows {
  room: string;
  user: string | number | undefined;
  isAdmin: boolean;
}
