import { randomUUID } from "crypto";
// The usual import syntax for aws does not work on AWS Lambdas
// for a non-determined reason (it should be available according to the docs).
// The below sidesteps the issue as an alternative to introduction
// of the aws dependency in package.json.
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
 * until the automatic removal of the note from the table
 * @returns the created note
 */
const postNoteService = async (createdBy, noteContent, expirationTime) => {
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
    id: id,
    createdBy: createdBy,
    noteContent: noteContent,
    expirationDate: Math.floor(Date.now() / 1000) + expirationTime,
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
    const body = JSON.parse(event.body);
    const added = await postNoteService(
      body.createdBy,
      body.noteContent,
      body.expirationTime
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

  console.dir(response);
  return response;
};
