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

// TODO: HARDCODED KEY NAME
// TODO: NOT CALL getMasterKeyArnFromAlias TWICE
// TODO: POSSIBLY NOT USE LIST ALIASES FOR HAVEN ADMIN AND OTHERS
const setupKey = async () => {
  let keyArn = await getMasterKeyArnFromAlias(AWS, "LockitKey2");
  if (keyArn) {
    const keyInfo = await describeKey(AWS, keyArn);
    if (keyInfo.KeyMetadata.KeyState === "PendingDeletion") {
      cancelKeyDeletion(AWS, keyArn);
    }
  } else {
    createMasterKey(AWS, keyAlias, "LockitMasterKey");
    keyArn = await getMasterKeyArnFromAlias(AWS, "LockitKey2");
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

    const { AccessKeyId, SecretAccessKey, accountId } = await createHavenAdmin(
      AWS
    );
    // TODO: HARDCODED REGION
    await createHavenAdminPolicy(
      AWS,
      "us-east-1",
      accountId,
      "LockitAdmin", /* TODO: is this needed? */
      keyArn
    );

    // TODO: HARDCODED REGION
    createHavenAccountFile(
      Number(accountId),
      "us-east-1",
      "LockitAdmin",
      AccessKeyId,
      SecretAccessKey,
      "Admin"
    );

    await attachUserPolicy(AWS, accountId);
    await sleep(14000);
    const continueDefault = await import("./setup/continueSetup.js");
    await continueDefault.default(); // all modules for commands use default exports
  }
};

export default setup;
