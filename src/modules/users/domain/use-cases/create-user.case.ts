import { inject, singleton } from "tsyringe";
import { IUseCase } from "../../../../common/interfaces/use-case.interface";
import { UserApi } from "../../apis/inject-key";
import { TCreateUserForm } from "../../form/create-user.form";
import { type IUserApi } from "../apis/user.api";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../entities/user.entity";

@singleton()
export class CreateUserCase implements IUseCase<TCreateUserForm, User> {
  constructor(@inject(UserApi) private readonly _api: IUserApi) {}

  async execute(input: TCreateUserForm): Promise<User | undefined> {
    const dto = new CreateUserDto();
    dto.username = input.username;
    dto.email = input.email;
    dto.password = input.password;
    dto.first_name = input.firstName;
    dto.last_name = input.lastName;
    dto.gender = input.gender;
    dto.profile_image = input.profileImage;

    return await this._api.create(dto);
  }
}
