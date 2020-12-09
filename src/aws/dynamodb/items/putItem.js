import { createHavenDynamoDB } from "../../services.js";

const putItem = (secretName, secretValue, version, tableName) => {
  const params = {
    Item: {
      SecretName: {
        S: secretName,
      },
      SecretValue: {
        B: secretValue,
      },
      Version: {
        S: version,
      },
      Latest: {
        BOOL: true,
      },
      Flagged: {
        BOOL: false,
      },
    },
    TableName: tableName,
  };

  return createHavenDynamoDB().putItem(params).promise();
};

export default putItem;
