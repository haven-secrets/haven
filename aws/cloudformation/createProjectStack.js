import createProjectTemplate from "../../utils/createProjectYamlWriter.js";
import createStack from "./createStack.js";

const createProjectStack = (projectName) => {
  const stackName = `HavenSecrets${projectName}Stack`;
  const template = createProjectTemplate(projectName);
  createStack(stackName, template);
};

export default createProjectStack;
