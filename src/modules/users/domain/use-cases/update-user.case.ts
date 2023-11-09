import { inject, singleton } from "tsyringe";
import { IUseCase } from "../../../../common/interfaces/use-case.interface";
import { UserApi } from "../../apis/inject-key";
import { TUpdateUserForm } from "../../form/update-user.form";
import { type IUserApi } from "../apis/user.api";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { User } from "../entities/user.entity";

@singleton()
export class UpdateUserCase
  implements IUseCase<{ id: string; form: TUpdateUserForm }, User>
{
  constructor(@inject(UserApi) private readonly _api: IUserApi) {}

  async execute(input: {
    id: string;
    form: TUpdateUserForm;
  }): Promise<User | undefined> {
    const dto = new UpdateUserDto();
    dto.username = input.form.username;
    dto.email = input.form.email;
    if (input.form.password) {
      dto.password = input.form.password;
    }
    dto.first_name = input.form.firstName;
    dto.last_name = input.form.lastName;
    dto.gender = input.form.gender;

    return await this._api.update(input.id, dto);
  }
}
