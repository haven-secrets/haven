import { dynamodb } from "../../services.js";

const getAllVersions = async (tableName, secretName) => {
  const params = {
    ExpressionAttributeValues: {
      ":s": {
        S: secretName,
      },
    },
    FilterExpression: "SecretName = :s",
    TableName: tableName,
  };

  try {
    return await dynamodb.scan(params).promise();
  } catch (e) {
    console.log("Table does not exist");
  }
};

export default getAllVersions;
