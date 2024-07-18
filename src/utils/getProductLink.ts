interface Input {
  id: string;
  newPart: string;
  index?: number;
}
const getProductLink = ({ id, newPart, index }: Input): string => {
  const splittedId = id.split('-');

  splittedId.splice(index || splittedId.length - 1, 1, newPart);

  return splittedId.join('-');
};

export default getProductLink;
