import { randomUUID } from "crypto";
import aws from "/var/runtime/node_modules/aws-sdk/lib/aws.js";

aws.config.update({ region: "eu-central-1" });

const dynamoClient = new aws.DynamoDB.DocumentClient();
const notesTableName = "Notes";

/**
 * Adds a new note to the DynamoDB table.
 *
 * @param {String} createdBy the author of the note
 * @param {String} noteContent the content of the created note
 * @param {Number} expirationTime the number of seconds from the local system time elapsed
 * to the automatic removal of the note from the table
 * @returns the created note
 */
const createNoteService = async (createdBy, noteContent, expirationTime) => {
  const id = randomUUID();
  const params = {
    Item: {
      id: id,
      createdBy: createdBy,
      noteContent: noteContent,
      expirationDate: Math.floor(Date.now() / 1000) + expirationTime,
    },
    TableName: notesTableName,
  };
  await dynamoClient.put(params).promise();
  return {
    Item: {
      id: id,
      createdBy: createdBy,
      noteContent: noteContent,
      expirationDate: Math.floor(Date.now() / 1000) + expirationTime,
    },
  };
};

export const handler = async (event, context) => {
  console.log("event: ", event);

  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const added = await createNoteService(
      event.createdBy,
      event.noteContent,
      event.expirationTime
    );
    response.statusCode = 201;
    response.body = JSON.stringify(added);
  } catch (error) {
    console.error(error.message);
    response.body = JSON.stringify({
      msg: "Error inserting objects into the table",
    });
    response.statusCode = 500;
  }

  return response;
};
