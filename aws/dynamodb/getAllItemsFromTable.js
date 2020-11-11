import { dynamodb } from "../services.js";

const tableName = "MoreSecrets";

const getAllItems = async (tableName) => {
  const params = {
    TableName: tableName,
  };

  const selectAll = await dynamodb.scan(params).promise();
  return selectAll;
};

export default getAllItems;