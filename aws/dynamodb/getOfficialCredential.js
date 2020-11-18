import dotenv from "dotenv";
dotenv.config();
import AWS from "aws-sdk";

const region = process.env["REGION"];

const getOfficalCredential = async (
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

  const result = await dynamodb.getItem(params).promise();
  return {
    AccessKey: result.Item.AccessKey.S,
    SecretAccessKey: result.Item.SecretAccessKey.S,
  };
};

export default getOfficalCredential;
