import getAllItems from "./getAllItems.js";

const getAllPrimaryKeys = async (tableName) => {
  const list = await getAllItems(tableName);
  return list.Items.map(({ SecretName, Version }) => ({ SecretName, Version }));
};

export default getAllPrimaryKeys;
