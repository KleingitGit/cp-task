import {
  convertRawUserToUser,
  convertUserToRawUser,
  retry,
} from "../helper/users";
import { UsersService } from "../services/usersService";
import { rawUser, user } from "../types/users";

export class UsersController {
  #usersService: UsersService;

  constructor() {
    this.#usersService = new UsersService();
  }

  public async get(page: number) {
    const { data, numberOfPages } = await retry(() =>
      this.#usersService.get(page)
    );

    return {
      data: data.map((rawUser) => convertRawUserToUser(rawUser as rawUser)),
      numberOfPages,
    };
  }

  public async create(user: user) {
    return await retry(() =>
      this.#usersService.create(convertUserToRawUser(user))
    );
  }

  public async delete(id: string) {
    return await retry(() => this.#usersService.delete(id));
  }
}
