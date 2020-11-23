import { iam } from "../../services.js";

const listGroupsForUser = username => {
  const params = {
    UserName: username,
  };

  return iam.listGroupsForUser(params).promise();
};

export default listGroupsForUser;