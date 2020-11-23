import { dynamodb } from "../../services.js";

const flagItem = (primaryKey, tableName) => {
  const params = {
    Key: primaryKey,
    TableName: tableName,
    AttributeUpdates: {
      Flagged: {
        Value: {
          BOOL: true,
        },
      },
    },
  };

  dynamodb.updateItem(params).promise();
};

export default flagItem;