import getAllItems from "./getAllItems.js";

const getItemsByFilter = (tableName, filterAttribute) => {
  const filterAlias = `:${filterAttribute[0].toLowerCase()}`;

  const filterObject = {
    ExpressionAttributeValues: {
      [filterAlias]: {
        BOOL: true
      },
    },
    FilterExpression: `${filterAttribute} = ${filterAlias}`,
  };

  return getAllItems(tableName, filterObject);
};

export default getItemsByFilter;