import { iam } from "../../services.js";

const removeUserFromGroup = (groupName, username) => {
  const params = {
    GroupName: groupName,
    UserName: username,
  };

  return iam.removeUserFromGroup(params).promise();
};

export default removeUserFromGroup;
