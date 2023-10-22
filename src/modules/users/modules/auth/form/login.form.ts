import { Input, maxLength, minLength, object, string } from "valibot";

export const LoginForm = object({
  username: string([minLength(1, "Please enter your username.")]),
  password: string([minLength(1, "Please enter your password."), maxLength(8)]),
});

export type TLoginForm = Input<typeof LoginForm>;
