import { dynamodb } from "../../services.js";

const createTable = (params) => {
  return dynamodb.createTable(params).promise();
};

export default createTable;
