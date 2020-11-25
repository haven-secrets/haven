import getMasterKeyIdFromAlias from "../aws/kms/getMasterKeyIdFromAlias.js";
import describeKey from "../aws/kms/describeKey.js";
import reenableKey from "../aws/kms/reenableKey.js";
import createKey from "../aws/kms/createKey.js";
import createLoggingStack from "../aws/cloudformation/createLoggingStack.js";
import { lambda } from "../aws/services.js";
import setupFetchUserCredentialsLambda from "../aws/lambda/setupFetchUserCredentialsLambda.js";

// TODO: move this function to another file, possibly in a setup folder
const setupKey = async () => {
  const keyId = await getMasterKeyIdFromAlias("LockitKey2"); // TODO: update to LockitKey

  if (keyId) {
    const keyData = await describeKey(keyId);
    // TODO: maybe check if disabled and reenable it
    if (keyData.KeyMetadata.KeyState === "PendingDeletion") reenableKey(keyId);
  } else {
    createKey("Here's your Lockit key!");
  }
};

const loggingTableName = "LockitLogging"; // TODO: don't hardcode here
const loggingPolicyName = "LockitLogWritePolicy"; // ditto
const loggingGroupName = "LockitLogGroup"; // dittoditto

const lambdaName = "HavenSecretsFetchUserCredentials"; // dittodittoditto to all 6 of these lines
const groupName = "HavenSecretsTemporaryUsers";
const roleName = "HavenSecretsLambdaRole";
const lambdaPermisionsPolicyName = "HavenSecretsLambdaRolePolicy";
const invokePolicyName = "HavenSecretsInvokeFetchUserCredentialsPolicy";
const lambdaCodeFile = "aws/lambda/lambdaCode.js";

// TODO: handle user running setup twice (check if logging stack already exists)
const setup = async () => {
  createLoggingStack(loggingGroupName, loggingPolicyName, loggingTableName);
  setupKey();
  await setupFetchUserCredentialsLambda({ /* TODO: rename to e.g. createNewUserLambdaAndGroup(); */
    lambdaName, groupName, roleName, lambdaPermisionsPolicyName, invokePolicyName, lambdaCodeFile
  });
};

export default setup;
