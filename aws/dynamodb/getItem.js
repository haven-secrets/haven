import { dynamodb } from "../services.js";

const getItem = async (secretName, version, tableName) => {
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

  const result = await dynamodb.getItem(params).promise();
  return result.Item.SecretValue.B;
};

export default getItem;
