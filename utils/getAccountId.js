import AWS from "aws-sdk";

const getAccountId = async () => {
  const sts = new AWS.STS();
  return sts
    .getCallerIdentity()
    .promise()
    .then((data) => data.Account);
};

export default getAccountId;
