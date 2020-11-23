import AWS from "aws-sdk";
import havenDir from "../utils/havenDir.js";
import createHavenAdmin from "./setupAdmin/createHavenAdmin.js";
import createHavenAdminPolicy from "./setupAdmin/createHavenAdminPolicy.js";
import fetchHavenAccountInfo from "../utils/fetchHavenAccountInfo.js";
import attachUserPolicy from "./setupAdmin/attachUserPolicy.js";
import sleep from "../utils/sleep.js";
// import createMasterKey from "setupAdmin/createMasterKey.js";
// import getMasterKeyIdFromAlias from "../aws/kms/masterKeyIdFromAlias.js";
// import describeKey from "../aws/kms/describeKey.js";
// import cancelDeleteAndEnable from "../aws/kms/reenableKey.js";
import createLoggingTable from "./setupAdmin/createLoggingTable.js";
// import createLogWritePolicy from "../aws/iam/policies/createLogWritePolicy.js";
const hiddenAccountFilePath = `${havenDir}/havenAccountInfo.json`;

const setupWithAdmin = async () => {
  await createHavenAdmin(AWS);

  const {
    accountNumber,
    region,
    accessKeyId,
    secretAccessKey,
  } = fetchHavenAccountInfo();

  const havenAdminPolicy = await createHavenAdminPolicy(
    AWS,
    region,
    accountNumber,
    "HavenAdmin"
  );
  await attachUserPolicy(AWS, accountNumber);
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = accessKeyId;
  AWS.config.secretAccessKey = secretAccessKey;
  AWS.config.region = region;

  createLoggingTable(AWS);
  // createLogWritePolicy(AWS, region, accountNumber);
  //
  // const keyId = await getMasterKeyIdFromAlias("HavenSecretsKey");
  //
  // if (keyId) {
  //   const keyInfo = await describeKey(keyId);
  //
  //   if (keyInfo.KeyMetadata.KeyState === "PendingDeletion") {
  //     cancelDeleteAndEnable(keyId);
  //   } else {
  //     const description = "Here's your Lockit key!";
  //     createKey(description);
  //   }
  // }
};

export default setupWithAdmin;
