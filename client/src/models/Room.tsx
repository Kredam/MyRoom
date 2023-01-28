export interface Room {
  name: string;
  description: string;
  picture: string;
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
