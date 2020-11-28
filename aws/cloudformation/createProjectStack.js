import createProjectTemplate from "../../utils/createProjectYamlWriter.js";
import createStack from "./createStack.js";

const createProjectStack = (projectName, path) => {
  const stackName = `${path}${projectName}Stack`;
  const template = createProjectTemplate(projectName);
  createStack(stackName, template);
};

export default createProjectStack;
