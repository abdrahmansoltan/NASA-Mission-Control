const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0; // mongo understands this as to show all document

function getPgination(query) {
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;

  const skip = (page - 1) * limit; // calc the amount of documents to skip

  return {
    skip,
    limit,
  };
}

module.exports = {
  getPgination,
};
