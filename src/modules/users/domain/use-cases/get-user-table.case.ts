import { inject, singleton } from "tsyringe";
import { IPaginated } from "../../../../common/interfaces/pagination.interface";
import { IUseCase } from "../../../../common/interfaces/use-case.interface";
import { UserApi } from "../../apis/inject-key";
import { UserPagination, type IUserApi } from "../apis/user.api";
import { User } from "../entities/user.entity";

@singleton()
export class GetUserTableCase
  implements IUseCase<UserPagination, IPaginated<User>>
{
  constructor(@inject(UserApi) private readonly _api: IUserApi) {}

  async execute(input: UserPagination): Promise<IPaginated<User> | undefined> {
    return await this._api.getPagination(input);
  }
}
