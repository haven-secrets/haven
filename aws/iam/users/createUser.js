// TODO: don't hardcode stuff

import { iam } from "../../services.js";

const createUser = (username) => {
  const params = {
    UserName: username,
    Path: "/Lockit/",
  };

  return iam.createUser(params).promise();
};

export default createUser;
