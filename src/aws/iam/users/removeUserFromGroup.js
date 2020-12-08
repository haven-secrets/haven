import { createHavenIam } from "../../services.js";

const removeUserFromGroup = (groupName, username) => {
  const params = {
    GroupName: groupName,
    UserName: username,
  };

  return createHavenIam().removeUserFromGroup(params).promise();
};

export default removeUserFromGroup;
