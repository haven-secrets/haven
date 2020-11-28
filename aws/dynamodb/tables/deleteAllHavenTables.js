/* DEPRECATED */

// import { dynamodb } from "../../services.js";
// import getAllHavenTables from "./getAllHavenTables.js";
// import deleteTable from "./deleteTable.js";

// const deleteAllHavenTables = async () => {
//   const havenTables = await getAllHavenTables();
//   const tableDeletionPromises = havenTables.map(tableName => deleteTable(tableName));
//   return Promise.all(tableDeletionPromises);
// };

// deleteAllHavenTables();

// export default deleteAllHavenTables;