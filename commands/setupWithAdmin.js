import AWS from "aws-sdk";
import havenDir from "../utils/havenDir.js";
import fetchHavenAccountInfo from "../utils/fetchHavenAccountInfo.js";
import sleep from "../utils/sleep.js";
import createHavenAdmin from "./setupAdmin/iam/createHavenAdmin.js";
import createHavenAdminPolicy from "./setupAdmin/iam/createHavenAdminPolicy.js";
import attachUserPolicy from "./setupAdmin/iam/attachUserPolicy.js";
import createLogWritePolicy from "./setupAdmin/iam/createLogWritePolicy.js";
import createMasterKey from "./setupAdmin/kms/createMasterKey.js";
import describeKey from "./setupAdmin/kms/describeKey.js";
import getMasterKeyArnFromAlias from "./setupAdmin/kms/getMasterKeyArnFromAlias.js";
import cancelDeleteAndEnable from "./setupAdmin/kms/reenableKey.js";
import createLoggingTable from "./setupAdmin/dynamodb/createLoggingTable.js";

const setupWithAdmin = async () => {
  process.env.AWS_SDK_LOAD_CONFIG = true;
  const hiddenAccountFilePath = `${havenDir}/havenAccountInfo.json`;
  const keyAlias = "LockitKey2";

  await createHavenAdmin(AWS);

  const {
    accountNumber,
    region,
    accessKeyId,
    secretAccessKey,
  } = fetchHavenAccountInfo();

  let keyArn = await getMasterKeyArnFromAlias(AWS, keyAlias);

  if (keyArn) {
    const keyInfo = await describeKey(AWS, keyArn);
    if (keyInfo.KeyMetadata.KeyState === "PendingDeletion") {
      cancelDeleteAndEnable(AWS, keyArn);
    }
  } else {
    createMasterKey(AWS, keyAlias, "LockitMasterKey");
    keyArn = await getMasterKeyArnFromAlias(AWS, keyAlias);
  }

  const havenAdminPolicy = await createHavenAdminPolicy(
    AWS,
    region,
    accountNumber,
    "LockitAdmin",
    keyArn
  );

  await attachUserPolicy(AWS, accountNumber);

  await sleep(8000);
  AWS.config.update({
    region,
    accessKeyId,
    secretAccessKey,
  });

  await createLoggingTable(AWS);
  await createLogWritePolicy(AWS, region, accountNumber);
};

export default setupWithAdmin;