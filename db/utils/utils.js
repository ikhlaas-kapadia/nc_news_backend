exports.formatDates = list => {
  const newList = [...list].map(item => {
    const newItem = { ...item };
    newItem.created_at = new Date(newItem.created_at);
    return newItem;
  });
  console.log(newList);
  return newList;
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
