import { dynamodb } from "../services.js";

const createCredentialTable = (tableName) => {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: "TemporaryAccessKey",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "TemporaryAccessKey",
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
    else console.log();
  });
};

export default createCredentialTable;
