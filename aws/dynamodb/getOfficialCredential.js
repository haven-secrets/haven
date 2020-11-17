import { dynamodb } from "../services.js";

const getOfficalCredential = async (temporaryAccessKey) => {
  const params = {
    Key: {
      TemporaryAccessKey: {
        S: temporaryAccessKey,
      },
    },
    TableName: "LockitCredentials",
  };

  const result = await dynamodb.getItem(params).promise();
  return { AccessKey: result.Item.AccessKey.S, SecretAccessKey: result.Item.SecretAccessKey.S}
};

export default getOfficalCredential;
