import { dynamodb } from "../../services.js";

const getAllLatestItems = (tableName) => {
  const params = {
    ExpressionAttributeValues: {
      ":l": { BOOL: true },
    },
    FilterExpression: "Latest = :l",
    TableName: tableName,
  };

  return dynamodb.scan(params).promise();
};

export default getAllLatestItems;
