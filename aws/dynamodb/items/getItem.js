import { dynamodb } from "../../services.js";

const getItem = (secretName, tableName, version) => {
  let params;
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
    params = {
      ExpressionAttributeValues: {
        ':s': {S: secretName},
        ':l' : {BOOL: true}
      },
      FilterExpression: 'Latest = :l and SecretName = :s',
      TableName: tableName,
    };
    return dynamodb.scan(params).promise();
  }
};

export default getItem;
