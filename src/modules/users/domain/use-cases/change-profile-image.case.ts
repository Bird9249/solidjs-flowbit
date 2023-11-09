import { inject, singleton } from "tsyringe";
import { IUseCase } from "../../../../common/interfaces/use-case.interface";
import { UserApi } from "../../apis/inject-key";
import { type IUserApi } from "../apis/user.api";
import { User } from "../entities/user.entity";

@singleton()
export class ChangeProfileImageCase
  implements IUseCase<{ id: string; file: File }, User>
{
  constructor(@inject(UserApi) private readonly _api: IUserApi) {}

  async execute(input: { id: string; file: File }): Promise<User | undefined> {
    return await this._api.changeProfileImage(input.id, input.file);
  }
}
