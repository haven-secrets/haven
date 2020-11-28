import { dynamodb } from "../../services.js";

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

  dynamodb.updateItem(params).promise();
};

export default updateItemAttribute;
