import axios from "axios";
import type { user } from "../types/users";

export const fetchUsers = async (page: number) => {
  try {
    const response = await axios.get("http://localhost:3000/api/users", {
      params: { page },
    });

    return { users: response.data.data, numberOfPages: response.data.numberOfPages };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUser = async (newUser: Omit<user, "id">) => {
  try {
    const user = {
      ...newUser,
      orgId: "ad2560f5-3d08-465c-af04-2fd3501dd060",
    };

    const response = await axios.post("http://localhost:3000/api/users", user);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/users/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
