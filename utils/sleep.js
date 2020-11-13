const sleep = async (ms) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export default sleep;
