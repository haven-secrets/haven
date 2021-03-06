import getAllItems from "../aws/dynamodb/items/getAllItems.js";
import { loggingTableName } from "../utils/config.js";

const parseLogData = (logs) => {
  // extract properties
  logs.forEach((logItem) => {
    for (const logItemProperty in logItem) {
      logItem[logItemProperty] = logItem[logItemProperty].S;
    }
  });

  // reorder properties
  const propertiesInOrder = [
    "Project",
    "Environment",
    "EventType",
    "DateTime",
    "UserName",
    "SecretName",
    "Version",
    "Response",
  ];

  return logs.map((logItem) => {
    let reorderedLogItem = {};

    propertiesInOrder.forEach((property) => {
      reorderedLogItem[property] = logItem[property];
    });

    return reorderedLogItem;
  });
};

const sortLogs = (logs) => {
  logs.sort((item1, item2) => {
    return Date.parse(item2.DateTime) - Date.parse(item1.DateTime);
  });
};

const fetchLogs = async () => {
  try {
    let logs = await getAllItems(loggingTableName);
    logs = logs.Items;
    logs = parseLogData(logs);
    sortLogs(logs);

    return logs;
  } catch (error) {
    console.log(`${error.code}: ${error.message}`);
    return error;
  }
};

export default fetchLogs;
