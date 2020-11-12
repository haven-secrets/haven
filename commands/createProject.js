import generateReadTablePolicy from "../aws/iam/policies/generateReadTablePolicy.js";
import generateWriteTablePolicy from "../aws/iam/policies/generateWriteTablePolicy.js";
import attachGroupPolicy from "../aws/iam/groups/attachGroupPolicy.js";
import createGroup from "../aws/iam/groups/createGroup.js";
import createTable from "../aws/dynamodb/createTable.js";

const createProject = async (projectName) => {
  const environments = ["Dev", "Stg", "Prod"];
  const operations = ["Read", "Write"];
  await Promise.all(
    environments.map((environment) =>
      createTable(`Lockit${environment}${projectName}`)
    )
  );
  await Promise.all(
    environments.flatMap((environment) =>
      operations.map((operation) => {
        createGroup(`Lockit${environment}${projectName}${operation}`);
      })
    )
  );

  await Promise.all(
    environments.flatMap((environment) =>
      operations.map((operation) => {
        const table = `Lockit${environment}${projectName}`;
        operation === "Read"
          ? generateReadTablePolicy(
              table,
              `Lockit${environment}${projectName}${operation}`
            )
          : generateWriteTablePolicy(
              table,
              `Lockit${environment}${projectName}${operation}`
            );
      })
    )
  );

  await Promise.all(
    environments.flatMap((environment) =>
      operations.map((operation) => {
        const group = `Lockit${environment}${projectName}${operation}`;
        const policy = `Lockit/Lockit${environment}${projectName}${operation}`;
        return attachGroupPolicy(group, policy);
      })
    )
  );
};

export default createProject;
