import { Input, email, minLength, object, string } from "valibot";

export const ForGotPasswordForm = object({
  email: string([minLength(1, "Please enter your email."), email()]),
});

export type TForGotPasswordForm = Input<typeof ForGotPasswordForm>;
