"use server";
import { Query, ID } from "node-appwrite";
import { users, database, storage, BUCKET_ID, DATABASE_ID, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID } from "../appwrite.config";
import { CreateUserParams, RegisterUserParams } from "@/types";
import { parseStringify } from "../utils";

// CRETE  USER
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name);
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUsers = await users.list([]);
      if (existingUsers.total === 1) return existingUsers.users[0];
      return null;
    }
  }
};

//  GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

// REGISTER PTIENT
export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile = identificationDocument && new File(identificationDocument.get("blobFile"), identificationDocument?.get("fileName"));
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPatient = await database.createDocument(DATABASE_ID!, PATIENT_COLLECTION_ID!, ID.unique(), {
      identificationDocument: file?.$id ? file?.$id : null,
      identificationDocumentUrl: file?.$id ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}` : null,
      ...patient,
    });

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

// GET PATIENT
export const getPatient = async (userID: string) => {
  try {
    const patients = await database.listDocuments(DATABASE_ID!, PATIENT_COLLECTION_ID!, [Query.equal("userId", [userID])]);

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error("An error occurred while retrieving the patient details:", error);
  }
};
