import getAllPrimaryKeys from "./getAllPrimaryKeys.js";
import updateItemAttribute from "./updateItemAttribute.js";

const flagAllItems = async tableName => {
  const primaryKeys = await getAllPrimaryKeys(tableName);
  primaryKeys.forEach(({ SecretName, Version }) => updateItemAttribute(SecretName.S, Version.S, tableName, 'Flagged', true));
};

export default flagAllItems;