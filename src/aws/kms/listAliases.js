import { createHavenKms } from "../services.js";

const listAliases = () => {
  return createHavenKms().listAliases({}).promise();
};

export default listAliases;
