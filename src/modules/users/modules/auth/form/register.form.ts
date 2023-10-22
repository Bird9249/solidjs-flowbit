import { Input, email, maxLength, minLength, object, string } from "valibot";

export const RegisterForm = object({
  username: string([minLength(1, "Please enter your username.")]),
  email: string([minLength(1, "Please enter your email."), email()]),
  password: string([minLength(1, "Please enter your password."), maxLength(8)]),
  confirmPassword: string([
    minLength(1, "Please enter your confirm password."),
    maxLength(8),
  ]),
  //   isAccept: boolean(),
});

export type TRegisterForm = Input<typeof RegisterForm>;
