import { cloudformation } from "../services.js";
import createProjectTemplate from "../../utils/createProjectYamlWriter.js";

const createStack = async (projectName) => {
  const projectTemplate = createProjectTemplate(projectName);
  const params = {
    StackName: `LockitStack${projectName}` /* required */,
    TemplateBody: projectTemplate,
    Capabilities: ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM"],
  };
  await cloudformation.createStack(params).promise();

  cloudformation
    .waitFor("stackCreateComplete", {
      StackName: `LockitStack${projectName}`,
    })
    .promise();
};

export default createStack;
