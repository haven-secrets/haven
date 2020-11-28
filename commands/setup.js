import getMasterKeyArnFromAlias from "./setup/getMasterKeyArnFromAlias.js";
import describeKey from "./setup/describeKey.js";
import cancelKeyDeletion from "./setup/cancelKeyDeletion.js";
import createMasterKey from "./setup/createMasterKey.js";

import createHavenAccountFile from "../utils/createHavenAccountFile.js";
import fs from "fs";
import attachUserPolicy from "./setup/attachUserPolicy.js";
import sleep from "../utils/sleep.js";
import havenDir from "../utils/havenDir.js";
import createHavenAdmin from "./setup/createHavenAdmin.js";
import createHavenAdminPolicy from "./setup/createHavenAdminPolicy.js";
import AWS from "aws-sdk";

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
  masterKeyDescription,
  adminUserName,
  path,
  newUserCreationStackName
} from "../utils/config.js";

// TODO: HARDCODED KEY NAME
// TODO: NOT CALL getMasterKeyArnFromAlias TWICE
// TODO: POSSIBLY NOT USE LIST ALIASES FOR HAVEN ADMIN AND OTHERS
// TODO: move this function to another file, possibly in a setup folder
const setupKey = async () => {
  let keyArn = await getMasterKeyArnFromAlias(AWS, keyAlias);
  if (keyArn) {
    const keyInfo = await describeKey(AWS, keyArn);
    if (keyInfo.KeyMetadata.KeyState === "PendingDeletion") {
      cancelKeyDeletion(AWS, keyArn);
    }
  } else {
    await createMasterKey(AWS, masterKeyDescription, keyAlias);
    keyArn = await getMasterKeyArnFromAlias(AWS, keyAlias);
  }
  return keyArn;
};

const setup = async () => {
  process.env.AWS_SDK_LOAD_CONFIG = true;
  const hiddenAccountFilePath = `${havenDir}/havenAccountInfo.json`;
  if (fs.existsSync(hiddenAccountFilePath)) {
    console.log(
      "You already have an account setup, run teardown before running setup again!"
    );
  } else {
    const keyArn = await setupKey();

    const { AccessKeyId, SecretAccessKey, accountNumber } = await createHavenAdmin(
      AWS, path, adminUserName
    );
    
    // TODO: HARDCODED REGION
    await createHavenAdminPolicy(
      AWS,
      "us-east-1",
      accountNumber,
      adminUserName,
      keyArn,
      path
    );

    // TODO: HARDCODED REGION
    createHavenAccountFile(
      Number(accountNumber),
      "us-east-1",
      adminUserName,
      AccessKeyId,
      SecretAccessKey,
      "Admin"
    );

    await attachUserPolicy(AWS, accountNumber, path, adminUserName);
    await sleep(14000);
    const continueSetup = await import("./setup/continueSetup.js");
    await continueSetup.default(); // all modules for commands use default exports
  }
};

export default setup;
