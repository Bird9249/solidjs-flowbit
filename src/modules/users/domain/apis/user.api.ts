import {
  IPaginated,
  IPagination,
} from "../../../../common/interfaces/pagination.interface";
import { User } from "../entities/user.entity";

export interface UserPagination extends IPagination {
  search: string;
}

export interface IUserApi {
  getPagination(search: UserPagination): Promise<IPaginated<User>>;
}
