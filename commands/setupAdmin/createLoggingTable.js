const createLoggingTable = (AWS) => {
  const tableName = "HavenSecretsLogging";
  const dynamodb = new AWS.DynamoDB();
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

  dynamodb.createTable(params).promise();
};

export default createLoggingTable;
