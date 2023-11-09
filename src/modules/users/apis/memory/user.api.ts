import axios from "axios";
import { singleton } from "tsyringe";
import { IPaginated } from "../../../../common/interfaces/pagination.interface";
import { IUserApi, UserPagination } from "../../domain/apis/user.api";
import { CreateUserDto } from "../../domain/dtos/create-user.dto";
import { UpdateUserDto } from "../../domain/dtos/update-user.dto";
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

  async getOne(id: string): Promise<User> {
    const data = await axios({
      url: `http://localhost:3001/users/${id}`,
      params: { _embed: "profiles" },
    });

    data.data.profile = data.data.profiles[0];

    return data.data;
  }

  async changeProfileImage(id: string, file: File): Promise<User> {
    const profileUrl = window.URL.createObjectURL(file);

    const data = await axios({
      method: "patch",
      url: `http://localhost:3001/profiles/${id}`,
      data: { profileUrl },
    });

    const userRes = await axios({
      url: `http://localhost:3001/users/${data.data.userId}`,
    });

    const user = new User();
    user.id = userRes.data.id;
    user.username = userRes.data.username;
    user.email = userRes.data.email;

    const profile = new Profile();
    profile.id = data.data.id;
    profile.firstName = data.data.firstName;
    profile.lastName = data.data.lastName;
    profile.gender = data.data.gender;
    profile.profileUrl = data.data.profileUrl;

    user.profile = profile;

    return user;
  }

  async update(id: string, input: UpdateUserDto): Promise<User> {
    const user = new User();
    user.username = input.username;
    user.email = input.email;
    if (input.password) {
      user.password = input.password;
    }

    const profile = new Profile();
    profile.firstName = input.first_name;
    profile.lastName = input.last_name;
    profile.gender = input.gender;

    const userRes = await axios({
      method: "patch",
      url: `http://localhost:3001/users/${id}`,
      data: user,
    });

    const profileRes = await axios({
      method: "patch",
      url: `http://localhost:3001/profiles/${userRes.data.profileId}`,
      data: profile,
    });

    userRes.data.profile = profileRes;

    return userRes.data;
  }
}
