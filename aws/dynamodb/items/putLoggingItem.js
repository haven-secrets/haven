import { iam, dynamodb } from "../../services.js";
import { loggingTableName } from "../../../utils/config.js";
import { v4 as uuidv4 } from 'uuid';

const putLoggingItem = async (
  project,
  environment,
  eventType,
  secretName,
  version,
  response
) => {
  const uuid = uuidv4();
  const now = new Date().toUTCString();
  const userData = await iam.getUser({}).promise();
  const username = userData.User.UserName;

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
    TableName: loggingTableName
  };

  return dynamodb.putItem(params).promise();
};

export default putLoggingItem;
