import { createHavenDynamoDB } from "../../services.js";

const updateItemAttribute = (secretName, version, tableName, attribute, value) => {
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
      [attribute]: {
        Value: {
          BOOL: value,
        },
      },
    },
  };

  createHavenDynamoDB().updateItem(params).promise();
};

export default updateItemAttribute;
