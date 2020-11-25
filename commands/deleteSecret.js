import constructTableName from "../utils/constructTableName.js";
import deleteAllVersions from "../aws/dynamodb/items/deleteAllVersions.js";

const deleteSecret = (projectName, environment, secretName) => {
  const tableName = constructTableName(projectName, environment);
  deleteAllVersions(tableName, secretName);
};

export default deleteSecret;
