"use server";
import { Query, ID } from "node-appwrite";
import { users } from "../appwrite.config";
import { CreateUserParams } from "@/types";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name);
    console.log(newUser);
    return parsS
  } catch (error: any) {
    console.log(error);

    if (error && error?.code === 409) {
      const document = await users.list([Query.equal("email", [user.email])]);

      return { data: document?.users[0], status: error?.code };
    }
    return { data: error?.response, status: error?.code };
  }
};
