import { dynamodb } from "../services.js";

const getAllLockitTables = () => {
  const params = {};
  return dynamodb
    .listTables(params)
    .promise()
    .then((result) => {
      return result.TableNames.filter((table) => table.match(/^Lockit/));
    });
};

export default getAllLockitTables;
