import notesApi from "./notesApi";

/**
 * Requests and returns a Note object from the backend service.
 *
 * @param {String} id the id of the requested note
 * @return {Note} the requested note
 */
const getNote = async (id) => {
  const response = await notesApi.get("/notes/" + id);
  const { data } = response;
  return {statusCode: response.status, data: data};
};

export default getNote;
