import { dynamodb } from "../services.js";

const tableName = "MoreSecrets";

const getAllItems = tableName => {
  const params = {
    TableName: tableName,
  };

  return dynamodb.scan(params).promise();
};

export default getAllItems;