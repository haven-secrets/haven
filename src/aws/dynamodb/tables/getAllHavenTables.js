import { createHavenDynamoDB } from "../../services.js";

const getAllHavenTables = async (path) => {
  const dynamodb = await createHavenDynamoDB();
  const list = await dynamodb.listTables({}).promise();
  const regex = new RegExp(`^${path}`);
  return list.TableNames.filter((table) => table.match(regex));
};

export default getAllHavenTables;
