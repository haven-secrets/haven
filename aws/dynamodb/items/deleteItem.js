import { dynamodb } from "../../services.js";

const deleteItem = (tableName, secretName, version) => {
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
  };

  return dynamodb.deleteItem(params).promise();
};

export default deleteItem;
