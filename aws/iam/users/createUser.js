import { iam } from "../../services.js";

const createUser = (username, tags) => {
  const params = {
    UserName: username,
    Path: "/HavenSecrets/",
    Tags: tags,
  };

  return iam.createUser(params).promise();
};

export default createUser;