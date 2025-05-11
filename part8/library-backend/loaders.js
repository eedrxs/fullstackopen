const DataLoader = require("dataloader")
const Book = require("./models/book")

const bookLoader = new DataLoader(async (authorIds) => {
  // Batch fetch book counts for all author IDs
  const books = await Book.aggregate([
    { $match: { author: { $in: authorIds } } },
    { $group: { _id: "$author", count: { $sum: 1 } } },
  ])

  // Map the results to match the order of authorIds
  const bookCountMap = books.reduce((acc, book) => {
    acc[book._id] = book.count
    return acc
  }, {})

  return authorIds.map((id) => bookCountMap[id] || 0) // Default to 0 if no books
})

module.exports = { bookLoader }
