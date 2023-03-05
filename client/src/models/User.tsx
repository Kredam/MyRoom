export interface User {
  id: number;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  date_joined: Date;
  email: string;
  joined: Date;
  born: Date;
  NSFW: boolean;
}

export interface UsersQuery {
  nrOfUsers: number;
  users: User[];
}
