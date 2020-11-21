import createTable from "./createTable.js";

const createLoggingTable = () => {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: "PK",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "PK",
        KeyType: "HASH",
      },
    ],
    TableName: "LockitLogging", // TODO: change name
  };

  return createTable(params);
};

export default createLoggingTable;