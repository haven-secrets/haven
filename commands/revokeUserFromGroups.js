// TODO: should the name be singular or plural if we want to handle both cases?
import removeUserFromGroup from "../aws/iam/users/removeUserFromGroup.js";

const revokeUserFromGroups = (username, ...groupNames) => {
  groupNames.forEach(groupName => removeUserFromGroup(groupName, username)); 
};

export default revokeUserFromGroups;