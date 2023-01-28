export interface User {
  id: number;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  // date_joined: Date;
  // joined: Date;
  // born: Date;
  NSFW: boolean;
}
