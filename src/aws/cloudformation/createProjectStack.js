import createProjectTemplate from "../../utils/createProjectYamlWriter.js";
import createStack from "./createStack.js";

const createProjectStack = async (projectName, path) => {
  const stackName = `${path}${projectName}Stack`;
  const template = await createProjectTemplate(projectName);
  return createStack(stackName, template);
};

export default createProjectStack;
