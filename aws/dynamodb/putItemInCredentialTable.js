import { dynamodb } from "../services.js";

const putItemInCredentialTable = (
  temporaryAccessKeyId,
  accessKeyId,
  secretAccessKeyId,
  username
) => {
  const params = {
    Item: {
      TemporaryAccessKey: {
        S: temporaryAccessKeyId,
      },
      AccessKey: {
        S: accessKeyId,
      },
      SecretAccessKey: {
        S: secretAccessKeyId,
      },
      UserName: {
        S: username,
      },
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: "LockitCredentials",
  };

  return dynamodb.putItem(params).promise();
};

export default putItemInCredentialTable;
