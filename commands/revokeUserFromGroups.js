// TODO: should the name be singular or plural if we want to handle both cases?
import removeUserFromGroup from "../aws/iam/users/removeUserFromGroup.js";
import getUniqueTableNamesFromGroupNames from "../utils/getUniqueTableNamesFromGroupNames.js";
import flagAllItems from "../aws/dynamodb/items/flagAllItems.js";

const revokeUserFromGroups = (username, ...groupNames) => {
  try {
    groupNames.forEach((groupName) => removeUserFromGroup(groupName, username));

  // TODO: either change the pattern in the function below or update group names to be HavenProjectEnvAction, and what about admin groupss?
    const tableNames = getUniqueTableNamesFromGroupNames(groupNames);
    tableNames.forEach((tableName) => flagAllItems(tableName));
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    return error;
  }
};

export default revokeUserFromGroups;
