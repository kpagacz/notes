# Data Model
The application stores data about the notes: its content, date of expiration and the user who created the note.

## Models
### Notes
* id String
* createdBy String the author of the note
* expirationDate Number the expiration date of the note (Unix epoch time format in seconds)
* noteContent String the content of the note
