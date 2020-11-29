import removeUserFromGroup from "../aws/iam/users/removeUserFromGroup.js";
import getUniqueTableNamesFromGroupNames from "../utils/getUniqueTableNamesFromGroupNames.js";
import flagAllItems from "../aws/dynamodb/items/flagAllItems.js";

const revokeUserFromGroups = (username, ...groupNames) => {
  try {
    groupNames.forEach((groupName) => removeUserFromGroup(groupName, username));

    const tableNames = getUniqueTableNamesFromGroupNames(groupNames);
    tableNames.forEach((tableName) => flagAllItems(tableName));
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    return error;
  }
};

export default revokeUserFromGroups;
