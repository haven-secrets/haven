require("dotenv").config();
const AWS = require("aws-sdk");
const region = process.env["REGION"];
const dynamodb = new AWS.DynamoDB({ region });
const secretName = "NetflixPassword";
const secretValue = "HuluPassword";
const tableName = "DevSecrets";
const version = "1";

const params = {
  Item: {
    SecretName: {
      S: secretName,
    },
    SecretValue: {
      S: secretValue,
    },
    Version: {
      S: version,
    },
  },
  ReturnConsumedCapacity: "TOTAL",
  TableName: tableName,
};
dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
});
