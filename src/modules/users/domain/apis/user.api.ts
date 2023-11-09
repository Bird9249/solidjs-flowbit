import {
  IPaginated,
  IPagination,
} from "../../../../common/interfaces/pagination.interface";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { User } from "../entities/user.entity";

export interface UserPagination extends IPagination {
  search: string;
}

export interface IUserApi {
  getPagination(search: UserPagination): Promise<IPaginated<User>>;

  create(input: CreateUserDto): Promise<User>;

  getOne(id: string): Promise<User>;

  changeProfileImage(id: string, file: File): Promise<User>;

  update(id: string, input: UpdateUserDto): Promise<User>;
}
