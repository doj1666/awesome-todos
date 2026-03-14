const { getConnectedClient } = require("../database");

const getCollection = () => {
  const client = getConnectedClient();
  if (!client) {
    throw new Error("Client is not connected to MongoDB");
  }
  const collection = client.db("todosdb").collection("todos");
  return collection;
};

module.exports = { getCollection };