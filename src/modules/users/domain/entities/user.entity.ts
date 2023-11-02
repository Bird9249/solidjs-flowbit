import { Entity } from "../../../../common/entity/entity";
import { Profile } from "./profile.entity";

export class User extends Entity {
  username!: string;

  email!: string;

  password!: string;

  verifyAt?: string;

  profile!: Profile;
}
