import getAllVersions from "./getAllVersions.js";
import deleteItem from "./deleteItem.js";

const deleteAllVersions = async (tableName, secretName) => {
  const allVersionsOfSecret = await getAllVersions(tableName, secretName);
  if (!allVersionsOfSecret) return;
  if (allVersionsOfSecret.Count === 0) {
    console.log("Secret does not exist.");
    return;
  }
  allVersionsOfSecret.Items.forEach((item) => {
    deleteItem(tableName, item.SecretName.S, item.Version.S);
  });
  console.log("Successfully deleted all versions of secret.");
};

export default deleteAllVersions;
