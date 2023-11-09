import {
  Input,
  email,
  enum_,
  maxLength,
  minLength,
  object,
  string,
} from "valibot";
import { Gender } from "../domain/entities/profile.entity";

export const UpdateUserForm = object({
  firstName: string([
    minLength(1, "Please enter your first name."),
    maxLength(50),
  ]),
  lastName: string([
    minLength(1, "Please enter your last name."),
    maxLength(50),
  ]),
  gender: enum_(
    Gender,
    `gender must be one of the following values: ${Object.values(Gender).join(
      ", "
    )}`
  ),
  email: string([minLength(1, "Please enter your email."), email()]),
  username: string([
    minLength(1, "Please enter your username."),
    maxLength(30),
  ]),
  password: string([maxLength(8)]),
  confirmPassword: string([maxLength(8)]),
});

export type TUpdateUserForm = Input<typeof UpdateUserForm>;
