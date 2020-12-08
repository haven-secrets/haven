import { createHavenDynamoDB } from "../../services.js";

const getAllItems = (tableName, filter) => {
  const params = Object.assign({ TableName: tableName }, filter);
  return createHavenDynamoDB().scan(params).promise();
};

export default getAllItems;
