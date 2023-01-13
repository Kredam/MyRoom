export interface Room {
  name: string;
  description: string;
  picture: string;
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
