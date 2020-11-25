import constructTableName from "../../../utils/constructTableName.js";
import createTable from "./createTable.js";

const createSecretsTable = (project, environment) => {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: "SecretName",
        AttributeType: "S",
      },
      {
        AttributeName: "Version",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "SecretName",
        KeyType: "HASH",
      },
      {
        AttributeName: "Version",
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    TableName: constructTableName(project, environment),
  };

  return createTable(params);
};

export default createSecretsTable;