import axios from "axios";
import { singleton } from "tsyringe";
import { IPaginated } from "../../../../common/interfaces/pagination.interface";
import { IUserApi, UserPagination } from "../../domain/apis/user.api";
import { User } from "../../domain/entities/user.entity";

@singleton()
export class UserApiMemory implements IUserApi {
  async getPagination({
    page,
    limit,
    search,
  }: UserPagination): Promise<IPaginated<User>> {
    const data = await axios({
      url: "http://localhost:3001/users",
      params: { _page: page, _limit: limit, q: search, _embed: "profiles" },
    });

    return {
      data: data.data.map((data: any) => ({
        ...data,
        profile: data.profiles[0],
      })),
      total: data.headers["x-total-count"],
    };
  }
}
