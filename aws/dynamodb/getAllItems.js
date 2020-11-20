// TODO: don't hardcode stuff

import { dynamodb } from "../services.js";

const getAllItems = tableName => {
  const params = {
    TableName: tableName,
  };

  return dynamodb.scan(params).promise();
};

export default getAllItems;