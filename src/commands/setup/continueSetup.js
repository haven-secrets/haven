import createLoggingStack from "../../aws/cloudformation/createLoggingStack.js";
import setupFetchUserCredentialsLambda from "../../aws/lambda/setupFetchUserCredentialsLambda.js";
import {
  loggingTableName,
  loggingPolicyName,
  loggingGroupName,
  lambdaName,
  temporaryGroupName,
  roleName,
  lambdaPermisionsPolicyName,
  invokePolicyName,
  lambdaCodeFile,
  newUserCreationStackName,
  path
} from "../../utils/config.js";

const continueSetup = async () => {
  console.log("continuing setup using the new Haven admin user...");

  await createLoggingStack(
    loggingGroupName,
    loggingPolicyName,
    loggingTableName
  );

  await setupFetchUserCredentialsLambda({ 
    lambdaName,
    temporaryGroupName,
    roleName,
    lambdaPermisionsPolicyName,
    invokePolicyName,
    lambdaCodeFile,
    newUserCreationStackName,
    path
  });
};

export default continueSetup;
