import { inject, singleton } from "tsyringe";
import { IUseCase } from "../../../../common/interfaces/use-case.interface";
import { UserApi } from "../../apis/inject-key";
import { type IUserApi } from "../apis/user.api";
import { User } from "../entities/user.entity";

@singleton()
export class GetOneUserCase implements IUseCase<string, User> {
  constructor(@inject(UserApi) private readonly _api: IUserApi) {}

  async execute(input: string): Promise<User | undefined> {
    return await this._api.getOne(input);
  }
}
