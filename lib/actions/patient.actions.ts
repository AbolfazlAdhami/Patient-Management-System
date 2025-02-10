"use server";
import { Query, ID } from "node-appwrite";
import { users } from "../appwrite.config";
import { CreateUserParams } from "@/types";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name);
    console.log(newUser);
    return parseStringify(newUser);
  } catch (error: any) {
    console.log(error);
    if (error && error?.code === 409) {
      const existingUsers = await users.list([Query.equal("email", [user.email])]);
      console.log(existingUsers);
      if (existingUsers.total === 1) return existingUsers.users[0];
      return null;
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};
