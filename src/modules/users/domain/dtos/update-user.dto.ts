import { Gender } from "../entities/profile.entity";

export class UpdateUserDto {
  first_name!: string;

  last_name!: string;

  gender!: Gender;

  email!: string;

  username!: string;

  password?: string;
}
