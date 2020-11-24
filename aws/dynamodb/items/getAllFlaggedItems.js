import { dynamodb } from "../../services.js";

const getAllFlaggedItems = tableName => {
  const params = {
    ExpressionAttributeValues: {
      ":f": {
        BOOL: true
      },
    },
    FilterExpression: "Flagged = :f",
    TableName: tableName,
  };

  return dynamodb.scan(params).promise();
};

export default getAllFlaggedItems;