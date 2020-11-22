// TODO: don't hardcode stuff

import { iam } from "../../services.js";

const addUserToGroup = (groupName, username) => {
  const params = {
    GroupName: groupName,
    UserName: username,
  };

  return iam.addUserToGroup(params).promise();
};

export default addUserToGroup;