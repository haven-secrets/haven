import { dynamodb } from "../services.js";

const tableName = "MoreSecrets";

const getAllItems = async (tableName) => {
  const params = {
    TableName: tableName,
  };

  return await dynamodb.scan(params).promise();
};

export default getAllItems;