// TODO: should the name be singular or plural if we want to handle both cases?
import addUserToGroup from "../aws/iam/users/addUserToGroup.js";

const addUserToGroups = (username, ...groupNames) => {
  try {
    groupNames.forEach((groupName) => addUserToGroup(groupName, username));
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    return error;
  }
};

export default addUserToGroups;
