import createLoggingTable from "../aws/dynamodb/tables/createLoggingTable.js";
import createLogWritePolicy from "../aws/iam/policies/createLogWritePolicy.js";
import createGroup from "../aws/iam/groups/createGroup.js";
import attachGroupPolicy from "../aws/iam/groups/attachGroupPolicy.js";

const tableName = "LockitLogging"; // TODO: don't hardcode here
const policyName = "LockitLogWritePolicy"; // ditto
const groupName = "LockitLogGroup"; // dittoditto

const configureLogging = async () => {
  const loggingTable = await createLoggingTable(tableName);
  const loggingPolicy = await createLogWritePolicy(tableName, policyName);
  const loggingGroup = await createGroup(groupName);
  attachGroupPolicy(groupName, policyName);
};

export default configureLogging;
