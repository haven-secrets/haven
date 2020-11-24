// TODO: should the name be singular or plural if we want to handle both cases?
import addUserToGroup from "../aws/iam/users/addUserToGroup.js";

const addUserToGroups = (username, ...groupNames) => {
  groupNames.forEach(groupName => addUserToGroup(groupName, username)); 
};

export default addUserToGroups;