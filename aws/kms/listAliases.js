import { kms } from "../services.js";

const listAliases = () => {
  return kms.listAliases({}).promise();
};

export default listAliases;
