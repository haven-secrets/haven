// TODO: pass in table name (don't hardcode stuff)

import { dynamodb } from "../services.js";

//const tableName = "MoreSecrets";
const createTable = (tableName) => {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: "SecretName",
        AttributeType: "S",
      },
      {
        AttributeName: "Version",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "SecretName",
        KeyType: "HASH",
      },
      {
        AttributeName: "Version",
        KeyType: "RANGE",
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
    else console.log();
  });
};

export default createTable;
