import getAllPrimaryKeys from "./getAllPrimaryKeys.js";
import flagItem from "./flagItem.js";

const flagAllItems = async tableName => {
  const primaryKeys = await getAllPrimaryKeys(tableName);
  primaryKeys.forEach(primaryKey => flagItem(primaryKey, tableName));
};

export default flagAllItems;