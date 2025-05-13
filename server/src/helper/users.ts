import { rawUser, user } from "../types/users";

export const convertRawUserToUser = (rawUser: rawUser): user => ({
  firstName: rawUser.first_name,
  lastName: rawUser.last_name,
  email: rawUser.email,
  password: "",
  orgId: rawUser.org_id,
  id: rawUser.id,
});

export const convertUserToRawUser = (user: user): rawUser => ({
  first_name: user.firstName,
  last_name: user.lastName,
  email: user.email,
  password: user.password,
  org_id: user.orgId,
});

export const retry = async <T>(
  fn: () => Promise<T>,
  retries = 3
): Promise<T> => {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      console.log(`attempt ${attempt}:`, error);
      lastError = error;
    }
  }

  throw lastError;
};
