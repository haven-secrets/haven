import { dynamodb } from "../../services.js";

const getAllItems = (tableName, filter) => {
  const params = Object.assign({ TableName: tableName }, filter);
  return dynamodb.scan(params).promise();
};

export default getAllItems;
