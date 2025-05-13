import { supabase } from "../config/db";
import { rawUser } from "../types/users";

export class UsersService {
  #table = "users";

  public async get(page: number, size = 15) {
    const low = (page - 1) * size;
    const high = low + size - 1;

    const { data, error, count } = await supabase
      .from(this.#table)
      .select(
        `
        id,
        first_name,
        last_name,
        email,
        org_id
        `,
        { count: "exact" }
      )
      .range(low, high);

    if (error) throw error;

    const numberOfPages = count ? Math.ceil(count / size) : 0;

    return { data, numberOfPages };
  }

  public async create(user: rawUser) {
    const { data, error } = await supabase
      .from(this.#table)
      .insert(user)
      .select('id')
      .single();

    if (error) throw error;

    return data;
  }

  public async delete(id: string) {
    const { data, error } = await supabase
      .from(this.#table)
      .delete()
      .eq("id", id)
      .select('id')
      .single();

    if (error) throw error;

    return data;
  }
}
