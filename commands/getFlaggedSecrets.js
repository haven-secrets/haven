import getAllLockitTables from "../aws/dynamodb/tables/getAllLockitTables.js";
import getItemsByFilter from "../aws/dynamodb/items/getItemsByFilter.js";

const getFlaggedSecrets = async () => {
  const tableNames = await getAllLockitTables();
  const { Items } = await getItemsByFilter(tableNames[0], "Flagged"); // TODO: get secrets from ALL tables
  return Items; // TODO: determine what exactly to return here
};

export default getFlaggedSecrets;