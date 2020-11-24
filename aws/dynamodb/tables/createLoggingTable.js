import createTable from "./createTable.js";

const createLoggingTable = async (tableName) => {
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
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    TableName: tableName,
  };

  return await createTable(params);
};

export default createLoggingTable;
