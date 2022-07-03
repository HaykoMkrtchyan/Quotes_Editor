export const getMongoURI = (
  dbName?: string,
  dbUsername?: string,
  dbPassword?: string
) =>
  `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.qidiokn.mongodb.net/${dbName}?retryWrites=true&w=majority`;
