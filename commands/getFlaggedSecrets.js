import getAllHavenTables from "../aws/dynamodb/tables/getAllHavenTables.js";
import getItemsByFilter from "../aws/dynamodb/items/getItemsByFilter.js";

const getFlaggedSecrets = async () => {
  const tableNames = await getAllHavenTables();
  const itemsPromises = tableNames.map(tableName => getItemsByFilter(tableName, "Flagged"));  
  const items = await Promise.all(itemsPromises);

// TODO: determine what information exactly to return here
  return items.flatMap(({ Items }) => Items)
              .map(item => ({ SecretName: item.SecretName.S, Version: item.Version.S }));
};

export default getFlaggedSecrets;