const getTimeStamp = (): string => {
  const today = new Date();
  return `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
};

export default getTimeStamp;
