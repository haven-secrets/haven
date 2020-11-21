import { dynamodb } from "../../services.js";

const getAllLockitTables = async () => {
  const list = await dynamodb.listTables({}).promise();
  return list.TableNames.filter(table => table.match(/^Lockit/));
};

export default getAllLockitTables;