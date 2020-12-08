import { createHavenIam } from "../../services.js";

const getAllUsers = (path) => {
  const params = {
    PathPrefix: `/${path}/`,
  };

  return createHavenIam().listUsers(params).promise();
};

export default getAllUsers;
