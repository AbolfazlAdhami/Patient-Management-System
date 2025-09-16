/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Query, ID, InputFile } from "node-appwrite";
import { BUCKET_ID, DATABASE_ID, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, databases, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import { CreateUserParams, RegisterUserParams } from "@/types";

// CRETE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name);
    return parseStringify(newUser);
  } catch (error: any) {
    //
    if (error && error?.code === 409) {
      const existingUsers = await users.list([]);
      if (existingUsers.total === 1) return existingUsers.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

//  GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.log("An error occurred while retrieving the user details:", error);
  }
};

// REGISTER PATIENT
export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const blob = identificationDocument.get("blobFile");
      const fileName = identificationDocument?.get("fileName");

      if (blob instanceof Blob && typeof fileName == "string") {
        const inputFile = identificationDocument && InputFile.fromBlob(blob, fileName);

        file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
      }
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(DATABASE_ID!, PATIENT_COLLECTION_ID!, ID.unique(), {
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
    const patients = await databases.listDocuments(DATABASE_ID!, PATIENT_COLLECTION_ID!, [Query.equal("userId", [userID])]);

    if (patients.documents.length == 0) return null;

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error("An error occurred while retrieving the patient details:", error);
  }
};
