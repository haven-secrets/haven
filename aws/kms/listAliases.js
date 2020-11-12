import { kms } from "../services.js";

const listKeyAliases = () => {
  const params = {};

  return kms.listAliases(params).promise();
};

export default listKeyAliases;
