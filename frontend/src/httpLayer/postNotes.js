import notesApi from "./notesApi";

/**
 * Adds a new note to the backend storage.
 *
 * @param {String} noteContent the content of the note
 * @param {String} createdBy the author of the note
 *
 * @return {Object} the newly created note
 */
const createNote = async (noteContent, createdBy, expirationTime) => {
  const payload = {
    noteContent: noteContent,
    createdBy: createdBy,
    expirationTime: expirationTime,
  };
  try {
    const response = await notesApi.post("/notes", payload);
    const { data } = response;
    return { statusCode: response.status, data: data };
  } catch (exception) {
    return { statusCode: 404, data: {} };
  }
};

export default createNote;
