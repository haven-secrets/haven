// TODO: don't hardcode stuff

import { iam } from "../../services.js";

const createAccessKey = (username) => {
  const params = {
    UserName: username,
  };

  return iam.createAccessKey(params).promise();
};

export default createAccessKey;
