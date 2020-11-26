import { dynamodb } from "../../services.js";

const getAllHavenTables = async () => {
  const list = await dynamodb.listTables({}).promise();
  return list.TableNames.filter(table => table.match(/^HavenSecrets/));
};

export default getAllHavenTables;