import generateReadTablePolicy from "../aws/iam/policies/generateReadTablePolicy.js";
import generateWriteTablePolicy from "../aws/iam/policies/generateWriteTablePolicy.js";
import attachGroupPolicy from "../aws/iam/groups/attachGroupPolicy.js";
import createGroup from "../aws/iam/groups/createGroup.js";
import createTable from "../aws/dynamodb/createTable.js";

const createProject = async (projectName) => {
  const environments = ["Dev", "Stg", "Prod"];
  const environmentOperations = [
    ["DevRead", "Dev"],
    ["DevWrite", "Dev"],
    ["StgRead", "Stg"],
    ["StgWrite", "Stg"],
    ["ProdRead", "Prod"],
    ["ProdWrite", "Prod"],
  ];
  await Promise.all(
    environments.map((environment) =>
      createTable(`Lockit${environment}${projectName}`)
    )
  );
  const groups = environmentOperations.map((environmentOperation) => {
    return createGroup(`Lockit${environmentOperation[0]}${projectName}`);
  });

  await Promise.all(groups);

  const policies = environmentOperations.map((environmentOperation) => {
    const table = `Lockit${environmentOperation[1]}${projectName}`;
    return /Read/.test(environmentOperation[0])
      ? generateReadTablePolicy(
          table,
          `Lockit${environmentOperation[0]}${projectName}`
        )
      : generateWriteTablePolicy(
          table,
          `Lockit${environmentOperation[0]}${projectName}`
        );
  });

  await Promise.all(policies);

  const attachments = environmentOperations.map((environmentOperation) => {
    const group = `Lockit${environmentOperation[0]}${projectName}`;
    const policy = `Lockit/Lockit${environmentOperation[0]}${projectName}`;
    return attachGroupPolicy(group, policy);
  });

  await Promise.all(attachments);
};

export default createProject;
