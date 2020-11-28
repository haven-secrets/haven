import { iam } from "../../services.js";

const createUser = (username, path, tags) => {
  const params = {
    UserName: username,
    Path: `/${path}/`,
    Tags: tags,
  };

  return iam.createUser(params).promise();
};

export default createUser;
