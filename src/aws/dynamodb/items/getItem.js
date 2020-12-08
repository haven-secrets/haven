import { createHavenDynamoDB } from "../../services.js";

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

    return createHavenDynamoDB().getItem(params).promise();
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
    return createHavenDynamoDB().scan(params).promise();
  }
};

export default getItem;
