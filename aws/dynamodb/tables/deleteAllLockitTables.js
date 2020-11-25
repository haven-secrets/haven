/* DEPRECATED */

// import { dynamodb } from "../../services.js";
// import getAllLockitTables from "./getAllLockitTables.js";
// import deleteTable from "./deleteTable.js";

// const deleteAllLockitTables = async () => {
//   const lockitTables = await getAllLockitTables();
//   const tableDeletionPromises = lockitTables.map(tableName => deleteTable(tableName));
//   return Promise.all(tableDeletionPromises);
// };

// deleteAllLockitTables();

// export default deleteAllLockitTables;