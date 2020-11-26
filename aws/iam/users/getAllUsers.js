import { iam } from "../../services.js";

const getAllUsers = () => {
  const params = {
    PathPrefix: "/HavenSecrets/",
  };

  return iam.listUsers(params).promise();
};

export default getAllUsers;