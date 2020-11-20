// TODO: don't hardcode groupName

import { iam } from "../../services.js";

const createGroup = (groupName) => {
  const params = {
    GroupName: groupName,
    Path: "/Haven/",
  };

  return iam.createGroup(params).promise();
};

export default createGroup;
