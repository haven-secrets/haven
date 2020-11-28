import getItem from "./getItem.js";

const getLatestVersion = async (secretName, tableName) => {
  const result = await getItem(secretName, tableName);
  const item = result.Items ? result.Items[0] : result.Item;
  return item?.Version.S;
};

export default getLatestVersion;
