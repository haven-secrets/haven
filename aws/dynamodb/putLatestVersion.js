import { dynamodb } from "../services.js";

const putLatestVersion = (tableName, secretName) => {
  const params = {
    Item: {
      SecretName: {
        S: secretName,
      },
      VersionNumber: {
        S: "1",
      },
      Version: {
        S: "latest",
      },
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: tableName,
  };
  
  return dynamodb.putItem(params).promise();
};

export default putLatestVersion;
