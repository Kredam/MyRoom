export interface User {
  is_followed: boolean | null;
  id: number;
  password: string;
  username: string;
  first_name: string;
  last_login: Date;
  last_name: string;
  is_staff: boolean;
  date_joined: Date;
  email: string;
  joined: Date;
  born: Date | undefined;
  NSFW: boolean;
}

export interface UsersQuery {
  nrOfUsers: number;
  users: User[];
}
