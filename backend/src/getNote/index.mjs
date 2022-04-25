// The usual import syntax for aws does not work on AWS Lambdas
// for a non-determined reason (it should be available according to the docs).
// The below sidesteps the issue as an alternative to introduction
// of the aws dependency in package.json.
import aws from "/var/runtime/node_modules/aws-sdk/lib/aws.js";

aws.config.update({ region: "eu-central-1" });

const dynamoClient = new aws.DynamoDB.DocumentClient();
const notesTableName = "Notes";

/**
 * Retrieves a note from the storage
 *
 * @param {id} String the id of the note
 * @returns {Object} the retrieved note
 */
const getNoteService = async (id) => {
  console.log("Service called with: " + id);
  const params = {
    ExpressionAttributeValues: {
      ":id": id
    },
    KeyConditionExpression: "id = :id",
    TableName: notesTableName,
  };
  return dynamoClient.query(params).promise();
};

export const handler = async (event, context) => {
  console.log("event: ", event);

  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const note = await getNoteService(event.pathParameters.id);
    console.log("Query result: ");
    console.dir(note);
    response.statusCode = 200;
    response.body = JSON.stringify(note.Items[0]);
  } catch (error) {
    console.error(error.message);
    response.body = JSON.stringify({
      msg: "Error getting object from the table",
    });
    response.statusCode = 404;
  }

  return response;
};
