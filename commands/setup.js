import getMasterKeyArnFromAlias from "./setup/getMasterKeyArnFromAlias.js";
import describeKey from "./setup/describeKey.js";
import cancelKeyDeletion from "./setup/cancelKeyDeletion.js";
import createMasterKey from "./setup/createMasterKey.js";
import continueSetup from "./setup/continueSetup.js";
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
  const hiddenAccountFilePath = `${havenDir}/havenAccountInfo.json`;
  if (fs.existsSync(hiddenAccountFilePath)) {
    //   console.log(
    //     "You already have an account setup, run teardown before running setup again!"
    //   );
    // } else {
    //   const keyArn = await setupKey();
    //
    //   const { AccessKeyId, SecretAccessKey, accountId } = await createHavenAdmin(
    //     AWS
    //   );
    //   // TODO: HARDCODED REGION
    //   await createHavenAdminPolicy(
    //     AWS,
    //     "us-east-1",
    //     accountId,
    //     "LockitAdmin",
    //     keyArn
    //   );
    //
    //   // TODO: HARDCODED REGION
    //   createHavenAccountFile(
    //     Number(accountId),
    //     "us-east-1",
    //     AccessKeyId,
    //     SecretAccessKey,
    //     "Admin"
    //   );
    //
    //   await attachUserPolicy(AWS, accountId);
    // await sleep(8000);
    await continueSetup();
  }
};

export default setup;
