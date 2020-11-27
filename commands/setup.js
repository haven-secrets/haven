import getMasterKeyFromAlias from "../aws/kms/getMasterKeyFromAlias.js";
import describeKey from "../aws/kms/describeKey.js";
import reenableKey from "../aws/kms/reenableKey.js";
import createKey from "../aws/kms/createKey.js";
import createLoggingStack from "../aws/cloudformation/createLoggingStack.js";
import { lambda } from "../aws/services.js";
import setupFetchUserCredentialsLambda from "../aws/lambda/setupFetchUserCredentialsLambda.js";
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
  keyAlias,
  path,
  newUserCreationStackName
} from "../utils/config.js";

// TODO: move this function to another file, possibly in a setup folder
const setupKey = async () => {
  const masterKey = await getMasterKeyFromAlias(keyAlias);
  
  if (masterKey) {
    const keyId = masterKey.TargetKeyId;
    const keyData = await describeKey(keyId);
    // TODO: maybe check if disabled and reenable it
    if (keyData.KeyMetadata.KeyState === "PendingDeletion") reenableKey(keyId);
  } else {
    createKey("Here's your Haven key!", keyAlias);
  }
};

// TODO: handle user running setup twice (check if logging stack already exists)
const setup = async () => {
  createLoggingStack(loggingGroupName, loggingPolicyName, loggingTableName);
  setupKey();
  await setupFetchUserCredentialsLambda(
    {
      /* TODO: rename to e.g. createNewUserLambdaAndGroup(); */
      lambdaName,
      temporaryGroupName,
      roleName,
      lambdaPermisionsPolicyName,
      invokePolicyName,
      lambdaCodeFile,
      path,
      newUserCreationStackName,
    }
  );
};

export default setup;
