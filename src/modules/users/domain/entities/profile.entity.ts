import { Entity } from "../../../../common/entity/entity";
import { User } from "./user.entity";

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export class Profile extends Entity {
  firstName!: string;

  lastName!: string;

  gender!: Gender;

  profileUrl?: string;

  user!: User;
}
