exports.formatDates = list => {
  const newList = [...list].map(item => {
    const newItem = { ...item };
    newItem.created_at = new Date(newItem.created_at);
    return newItem;
  });
  // console.log(newList);
  return newList;
};

exports.makeRefObj = list => {
  const refObj = {};
  list.forEach(item => {
    refObj[item.title] = item.article_id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  const formattedComments = [...comments].map(comment => {
    const formatComment = { ...comment };
    formatComment.article_id = articleRef[formatComment.belongs_to];
    formatComment.author = formatComment.created_by;
    formatComment.created_at = new Date(formatComment.created_at);
    delete formatComment.belongs_to;
    delete formatComment.created_by;
    return formatComment;
  });

  return formattedComments;
};

// exports.checkExists=(table, column, value)=>{
//   return connection
//   .select("*")
//   .from("topics")
//   .where("topic", value)
//   .then(articleTopic => {
//     console.log(articleTopic, "****");
//     if (articleTopic.length === 0) {
// return false
//     } else return true
// }
