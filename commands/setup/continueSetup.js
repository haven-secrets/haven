import createLoggingStack from "../../aws/cloudformation/createLoggingStack.js";
import setupFetchUserCredentialsLambda from "../../aws/lambda/setupFetchUserCredentialsLambda.js";

const continueSetup = async () => {
  console.log("continue!!!!!");
  // TODO: handle user running setup twice (check if logging stack already exists)
  const loggingTableName = "LockitLogging"; // TODO: don't hardcode here
  const loggingPolicyName = "LockitLogWritePolicy"; // ditto
  const loggingGroupName = "LockitLogGroup"; // dittoditto

  const lambdaName = "HavenSecretsFetchUserCredentials"; // dittodittoditto to all 6 of these lines
  const groupName = "HavenSecretsTemporaryUsers";
  const roleName = "HavenSecretsLambdaRole";
  const lambdaPermisionsPolicyName = "HavenSecretsLambdaRolePolicy";
  const invokePolicyName = "HavenSecretsInvokeFetchUserCredentialsPolicy";
  const lambdaCodeFile = "aws/lambda/lambdaCode.js";

  await createLoggingStack(
    loggingGroupName,
    loggingPolicyName,
    loggingTableName
  );

  await setupFetchUserCredentialsLambda({
    /* TODO: rename to e.g. createNewUserLambdaAndGroup(); */
    lambdaName,
    groupName,
    roleName,
    lambdaPermisionsPolicyName,
    invokePolicyName,
    lambdaCodeFile,
  });
};

export default continueSetup;
