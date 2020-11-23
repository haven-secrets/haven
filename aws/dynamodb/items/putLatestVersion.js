import { dynamodb } from "../../services.js";

const putLatestVersion = (secretName, tableName) => {
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
    TableName: tableName,
  };

  return dynamodb.putItem(params).promise();
};

export default putLatestVersion;
