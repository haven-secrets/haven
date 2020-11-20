import { iam, dynamodb } from "../services.js";
import { v4 as uuidv4 } from 'uuid';

const loggingTableName = "LoggingTest"; // TODO: remove hardcoding

const putLoggingItem = async (
  project, environment, eventType, secretName, version, response
  ) => {
  const now = new Date().toUTCString();
  const userData = await iam.getUser({}).promise();
  const username = userData.User.UserName;
  const uuid = uuidv4();

  const params = {
    Item: {
      PK: {
        S: uuid,
      },
      Project: {
        S: project,
      },
      Environment: {
        S: environment,
      },
      EventType: {
        S: eventType,
      },
      DateTime: {
        S: now,
      },
      UserName: {
        S: username,
      },
      SecretName: {
        S: secretName,
      },
      Version: {
        S: version,
      },
      Response: {
        S: response,
      },
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: loggingTableName,
  };

  return dynamodb.putItem(params).promise();
};

export default putLoggingItem;
