/* DEPRECATED */

// import createSecretReadPolicy from "../aws/iam/policies/createSecretReadPolicy.js";
// import createSecretWritePolicy from "../aws/iam/policies/createSecretWritePolicy.js";
// import attachGroupPolicy from "../aws/iam/groups/attachGroupPolicy.js";
// import createGroup from "../aws/iam/groups/createGroup.js";
// import createSecretsTable from "../aws/dynamodb/tables/createSecretsTable.js";
// import getMasterKeyIdFromAlias from "../aws/kms/getMasterKeyIdFromAlias.js";

// const createProject = async (projectName) => {
//   const environments = ["Dev", "Stg", "Prod"];
//   const environmentOperations = [
//     ["DevRead", "Dev"],
//     ["DevWrite", "Dev"],
//     ["StgRead", "Stg"],
//     ["StgWrite", "Stg"],
//     ["ProdRead", "Prod"],
//     ["ProdWrite", "Prod"],
//   ];
//   const keyId = await getMasterKeyIdFromAlias("HavenSecretsKey");

//   await Promise.all(
//     environments.map((environment) =>
//       createSecretsTable(projectName, environment)
//     )
//   );
//   const groups = environmentOperations.map((environmentOperation) => {
//     return createGroup(`HavenSecrets${projectName}${environmentOperation[0]}`);
//   });

//   await Promise.all(groups);

//   const policies = environmentOperations.map((environmentOperation) => {
//     const table = `HavenSecrets${projectName}${environmentOperation[1]}`;
//     return /Read/.test(environmentOperation[0])
//       ? createSecretReadPolicy(
//           table,
//           `HavenSecrets${projectName}${environmentOperation[0]}`,
//           keyId
//         )
//       : createSecretWritePolicy(
//           table,
//           `HavenSecrets${projectName}${environmentOperation[0]}`,
//           keyId
//         );
//   });

//   await Promise.all(policies);

//   const secretPolicyAttachments = environmentOperations.map((environmentOperation) => {
//     const group = `HavenSecrets${projectName}${environmentOperation[0]}`;
//     const policy = `HavenSecrets${projectName}${environmentOperation[0]}`;
//     return attachGroupPolicy(group, policy);
//   });

//   const logPolicyAttachments = environmentOperations.map((environmentOperation) => {
//     const group = `HavenSecrets${environmentOperation[0]}${projectName}`;
//     return attachGroupPolicy(group, "HavenSecretsLogWritePolicy");
//   });

//   await Promise.all(secretPolicyAttachments);
//   await Promise.all(logPolicyAttachments);
// };

// export default createProject;
