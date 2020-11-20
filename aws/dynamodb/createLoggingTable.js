// TODO: pass in table name (don't hardcode stuff)
import { dynamodb } from "../services.js";

const tableName = "LockitLogging";

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
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    TableName: tableName,
  };

  dynamodb.createTable(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data); // TODO: replace
  });
};

export default createLoggingTable;
