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
import AWSRegions from "../utils/awsRegions.js";
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
  newUserCreationStackName,
} from "../utils/config.js";

const setupKey = async (region) => {
  let keyArn = await getMasterKeyArnFromAlias(AWS, keyAlias, region);
  if (keyArn) {
    const keyInfo = await describeKey(AWS, keyArn, region);
    if (keyInfo.KeyMetadata.KeyState === "PendingDeletion") {
      cancelKeyDeletion(AWS, keyArn, region);
    }
  } else {
    await createMasterKey(AWS, masterKeyDescription, keyAlias, region);
    keyArn = await getMasterKeyArnFromAlias(AWS, keyAlias, region);
  }
  return keyArn;
};

const setup = async (region) => {
  if (!AWSRegions.includes(region)) {
    console.log("Invalid region!");
    console.log("Valid regions are:");
    console.log(AWSRegions);
    return undefined;
  }
  process.env.AWS_SDK_LOAD_CONFIG = true;

  const hiddenAccountFilePath = `${havenDir}/havenAccountInfo.json`;
  if (fs.existsSync(hiddenAccountFilePath)) {
    console.log(
      "You already have an account setup, run teardown before running setup again!"
    );
  } else {
    const keyArn = await setupKey(region);
    const {
      AccessKeyId,
      SecretAccessKey,
      accountNumber,
    } = await createHavenAdmin(AWS, path, adminUserName, region);

    await createHavenAdminPolicy(
      AWS,
      region,
      accountNumber,
      adminUserName,
      keyArn,
      path
    );

    createHavenAccountFile(
      Number(accountNumber),
      region,
      adminUserName,
      AccessKeyId,
      SecretAccessKey,
      "Admin"
    );

    await attachUserPolicy(AWS, accountNumber, path, adminUserName);
    await sleep(15000);
    const continueSetup = await import("./setup/continueSetup.js");
    await continueSetup.default(); // all modules for commands use default exports
  }
};

export default setup;
