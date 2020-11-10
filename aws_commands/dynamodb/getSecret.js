import AWS from "aws-sdk";
import decryptSecret from "../kms/decryptSecret.js"
import dotenv from 'dotenv';
dotenv.config();

const region = process.env["REGION"];
const dynamodb = new AWS.DynamoDB({ region });
const tableName = "DevSecrets";
const secretName = "NetflixPassword";
const version = "1";

const params = {
  Key: {
    SecretName: {
      S: secretName,
    },
    Version: {
      S: version,
    },
  },
  TableName: tableName,
};

dynamodb.getItem(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else decryptSecret(data.Item.SecretValue.B);
});