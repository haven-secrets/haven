const attachUserPolicy = (AWS, accountNumber, path, adminUserName) => {
  const iam = new AWS.IAM();

  const params = {
    PolicyArn: `arn:aws:iam::${accountNumber}:policy/${path}/${adminUserName}`,
    UserName: adminUserName,
  };

  return iam.attachUserPolicy(params).promise();
};

export default attachUserPolicy;
