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
//   const keyId = await getMasterKeyIdFromAlias("LockitKey2");

//   await Promise.all(
//     environments.map((environment) =>
//       createSecretsTable(projectName, environment)
//     )
//   );
//   const groups = environmentOperations.map((environmentOperation) => {
//     return createGroup(`Lockit${projectName}${environmentOperation[0]}`);
//   });

//   await Promise.all(groups);

//   const policies = environmentOperations.map((environmentOperation) => {
//     const table = `Lockit${projectName}${environmentOperation[1]}`;
//     return /Read/.test(environmentOperation[0])
//       ? createSecretReadPolicy(
//           table,
//           `Lockit${projectName}${environmentOperation[0]}`,
//           keyId
//         )
//       : createSecretWritePolicy(
//           table,
//           `Lockit${projectName}${environmentOperation[0]}`,
//           keyId
//         );
//   });

//   await Promise.all(policies);

//   const secretPolicyAttachments = environmentOperations.map((environmentOperation) => {
//     const group = `Lockit${projectName}${environmentOperation[0]}`;
//     const policy = `Lockit${projectName}${environmentOperation[0]}`;
//     return attachGroupPolicy(group, policy);
//   });

//   const logPolicyAttachments = environmentOperations.map((environmentOperation) => {
//     const group = `Lockit${environmentOperation[0]}${projectName}`;
//     return attachGroupPolicy(group, "LockitLogWritePolicy");
//   });

//   await Promise.all(secretPolicyAttachments);
//   await Promise.all(logPolicyAttachments);
// };

// export default createProject;
