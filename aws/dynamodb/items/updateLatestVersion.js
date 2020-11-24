import { dynamodb } from "../../services.js";

const updateLatestVersion = (secretName, version, tableName) => {
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
    AttributeUpdates: {
      Latest: {
        Action: "PUT",
        Value: {
          BOOL: false,
        },
      },
    },
  };

  return dynamodb.updateItem(params).promise();
};

export default updateLatestVersion;
