require("dotenv").config();
const AWS = require("aws-sdk");
const region = process.env["REGION"];
const dynamodb = new AWS.DynamoDB({ region });
const tableName = "DevSecrets";

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
  // an error occurred
  else console.log(data); // successful response
});
