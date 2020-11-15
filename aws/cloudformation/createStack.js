import { cloudformation } from "../services.js";
import createProjectTemplate from "../../utils/createProjectYamlWriter.js";

const createStack = (projectName) => {
  const projectTemplate = createProjectTemplate(projectName);
  const params = {
    StackName: `LockitStack${projectName}` /* required */,
    TemplateBody: projectTemplate,
    Capabilities: ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM"],
  };
  return cloudformation
    .createStack(params)
    .promise()
    .then(
      cloudformation
        .waitFor("stackCreateComplete", {
          StackName: `LockitStack${projectName}`,
        })
        .promise()
    );
};

export default createStack;
