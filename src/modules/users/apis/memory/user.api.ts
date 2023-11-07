import axios from "axios";
import { singleton } from "tsyringe";
import { IPaginated } from "../../../../common/interfaces/pagination.interface";
import { IUserApi, UserPagination } from "../../domain/apis/user.api";
import { CreateUserDto } from "../../domain/dtos/create-user.dto";
import { Profile } from "../../domain/entities/profile.entity";
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

  async create(input: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = input.username;
    user.email = input.email;
    user.password = input.password;

    const profile = new Profile();
    profile.firstName = input.first_name;
    profile.lastName = input.last_name;
    if (input.profile_image) {
      profile.profileUrl = window.URL.createObjectURL(input.profile_image);
    }
    profile.gender = input.gender;

    const newUser = await axios<User>({
      method: "post",
      url: "http://localhost:3001/users",
      data: { ...user, profileId: profile.id },
    });

    const newProfile = await axios<Profile>({
      method: "post",
      url: "http://localhost:3001/profiles",
      data: { ...profile, userId: user.id },
    });

    newUser.data.profile = newProfile.data;

    return newUser.data;
  }
}
