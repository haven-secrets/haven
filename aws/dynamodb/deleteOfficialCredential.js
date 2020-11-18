import dotenv from "dotenv";
dotenv.config();
import AWS from "aws-sdk";

const region = process.env["REGION"];

const deleteOfficalCredential = async (
  temporaryAccessKey,
  temporarySecretAccessKey
) => {
  const options = {
    accessKeyId: temporaryAccessKey,
    secretAccessKey: temporarySecretAccessKey,
    region: region,
  };
  const dynamodb = new AWS.DynamoDB(options);
  const params = {
    Key: {
      TemporaryAccessKey: {
        S: temporaryAccessKey,
      },
    },
    TableName: "LockitCredentials",
  };

  return await dynamodb.deleteItem(params).promise();

};

export default deleteOfficalCredential;
