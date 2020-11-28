import { dynamodb } from "../../services.js";

const getItem = (secretName, tableName, version) => {
  if (version) {
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
  } else {
    const params = {
      ExpressionAttributeValues: {
        ":s": {
          S: secretName,
        },
        ":l": {
          BOOL: true,
        },
      },
      FilterExpression: "SecretName = :s and Latest = :l",
      TableName: tableName,
    };
    return dynamodb.scan(params).promise();
  }
};

export default getItem;
