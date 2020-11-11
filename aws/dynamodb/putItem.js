import { dynamodb } from "../services.js";

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
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: tableName,
  };

  return dynamodb.putItem(params).promise();
};

export default putItem;
