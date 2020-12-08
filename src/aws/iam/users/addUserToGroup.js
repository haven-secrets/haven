import { createHavenIam } from "../../services.js";

const addUserToGroup = (groupName, username) => {
  const params = {
    GroupName: groupName,
    UserName: username,
  };

  return createHavenIam().addUserToGroup(params).promise();
};

export default addUserToGroup;
