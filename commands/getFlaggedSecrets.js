import getAllLockitTables from "../aws/dynamodb/tables/getAllLockitTables.js";
import getAllFlaggedItems from "../aws/dynamodb/items/getAllFlaggedItems.js";

const getFlaggedSecrets = async () => {
  const tableNames = await getAllLockitTables();
  const { Items } = await getAllFlaggedItems(tableNames[0]);
  return Items; // TODO: determine what exactly to return here
};

export default getFlaggedSecrets;