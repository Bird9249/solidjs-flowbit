import { Input, maxLength, minLength, object, string } from "valibot";

export const ResetPasswordForm = object({
  password: string([minLength(1, "Please enter your password."), maxLength(8)]),
  confirmPassword: string([
    minLength(1, "Please enter your confirm password."),
    maxLength(8),
  ]),
  //   isAccept: boolean(),
});

export type TResetPasswordForm = Input<typeof ResetPasswordForm>;
