import getAllHavenTables from "../aws/dynamodb/tables/getAllHavenTables.js";
import getItemsByFilter from "../aws/dynamodb/items/getItemsByFilter.js";
import { path } from "../utils/config.js";

const getFlaggedSecrets = async () => {
  try {
    const tableNames = await getAllHavenTables(path);
    const itemsPromises = tableNames.map((tableName) =>
      getItemsByFilter(tableName, "Flagged")
    );
    const items = await Promise.all(itemsPromises);

    // TODO: determine what information exactly to return here, maybe table name too
    return items
      .flatMap(({ Items }) => Items)
      .map((item) => ({
        SecretName: item.SecretName.S,
        Version: item.Version.S,
      }));
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    return error;
  }
};

export default getFlaggedSecrets;
