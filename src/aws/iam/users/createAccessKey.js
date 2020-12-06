import { createHavenIam } from "../../services.js";

const createAccessKey = (username) => {
  const params = {
    UserName: username,
  };

  return createHavenIam().createAccessKey(params).promise();
};

export default createAccessKey;
