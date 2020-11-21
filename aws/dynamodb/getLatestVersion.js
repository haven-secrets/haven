import { dynamodb } from "../services.js";

const getLatestVersion = async (tableName, secretName) => {
  const params = {
    Key: {
      SecretName: {
        S: secretName,
      },
      Version: {
        S: "latest",
      },
    },
    TableName: tableName,
  };

  try {
    const result = await dynamodb.getItem(params).promise();
    return result.Item.VersionNumber.S;
  } catch (e) {
    if (e.message === "Requested resource not found") {
      console.log("Table does not exist");
      return "NO_TABLE";
    } else {
      console.log("Secret does not exist");
    }
  }
};

export default getLatestVersion;
