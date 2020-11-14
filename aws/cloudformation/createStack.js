import { cloudformation } from "../services.js";
import createProjectTemplate from "../../utils/createProjectYamlWriter.js";

const createStack = (projectName) => {
  const projectTemplate = createProjectTemplate(projectName);
  // console.log(projectTemplate);
  const params = {
    StackName: `LockitStack${projectName}` /* required */,
    TemplateBody: projectTemplate,
    Capabilities: ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM"],
  };
  cloudformation.createStack(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
};

export default createStack;
