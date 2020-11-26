
import { cloudformation } from "../services.js";
import createProjectTemplate from "../../utils/createProjectYamlWriter.js";

const listActiveHavenStacks = () => {
  const params = {
    StackStatusFilter: ["CREATE_COMPLETE"],
  };
  return cloudformation
    .listStacks(params)
    .promise()
    .then((result) => {
      return result.StackSummaries.filter((stack) =>
        stack.StackName.match(/^HavenSecrets/)
      );
    });
};

export default listActiveHavenStacks;
