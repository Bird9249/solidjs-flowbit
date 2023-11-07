import { Gender } from "../entities/profile.entity";

export class CreateUserDto {
  first_name!: string;

  last_name!: string;

  gender!: Gender;

  profile_image?: File;

  email!: string;

  username!: string;

  password!: string;
}
