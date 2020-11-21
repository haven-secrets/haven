import { dynamodb } from "../services.js";

const updateLatestVersion = (tableName, secretName, version) => {
  const params = {
    Key: {
      SecretName: {
        S: secretName,
      },
      Version: {
        S: "latest",
      },
    },
    TableName: tableName,
    AttributeUpdates: {
      VersionNumber: {
        Action: "PUT",
        Value: {
          S: version,
        },
      },
    },
  };

  return dynamodb.updateItem(params).promise();
};

export default updateLatestVersion;
