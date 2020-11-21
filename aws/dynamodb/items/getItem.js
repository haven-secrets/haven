import { dynamodb } from "../../services.js";

const getItem = (secretName, version, tableName) => {
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

  return dynamodb.getItem(params).promise();
};

export default getItem;