import createLoggingTable from "../aws/dynamodb/tables/createLoggingTable.js";
import createLogWritePolicy from "../aws/iam/policies/createLogWritePolicy.js";
import createGroup from "../aws/iam/groups/createGroup.js";
import attachGroupPolicy from "../aws/iam/groups/attachGroupPolicy.js";
import {
  loggingTableName,
  loggingPolicyName,
  loggingGroupName,
} from "../utils/config.js";

const configureLogging = async () => {
  await createLoggingTable(loggingTableName);
  await createLogWritePolicy(loggingTableName, loggingPolicyName);
  await createGroup(loggingGroupName);
  attachGroupPolicy(loggingGroupName, loggingPolicyName);
};

export default configureLogging;
