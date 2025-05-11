const Book = require("./models/book")
const Author = require("./models/author")
const User = require("./models/user")
const jwt = require("jsonwebtoken")
const { v1: uuid } = require("uuid")
const { GraphQLError } = require("graphql")
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      const aggregatePipeline = [
        {
          $lookup: {
            from: "authors",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
        {
          $match: {
            ...(args.author && { "author.name": args.author }),
            ...(args.genre && { genres: { $in: [args.genre] } }),
          },
        },
      ]

      const books = await Book.aggregate(aggregatePipeline)
      return books
    },
    allAuthors: async (root, args) => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator("BOOK_ADDED"),
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const author = await Author.findOne({ name: args.author })
      const newBook = new Book(args)

      try {
        if (author) {
          newBook.author = author
        } else {
          const newAuthor = new Author({ name: args.author })
          await newAuthor.save()
          newBook.author = newAuthor
        }

        await newBook.save()
        pubsub.publish("BOOK_ADDED", { bookAdded: newBook })

        return newBook
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: error.name,
            invalidArgs: error.errors.title.path,
            error,
          },
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const author = await Author.findOne({ name: args.name })

      if (author) {
        try {
          author.born = args.setBornTo
          await author.save()
          return author
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: {
              code: error.name,
              invalidArgs: "setBornTo",
              error,
            },
          })
        }
      }
    },
    createUser: async (root, args) => {
      const user = new User(args)
      return user.save().catch((error) => {
        throw new GraphQLError(error.message, {
          code: error.name,
          invalidArgs: args.username,
          error,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    },
  },
  Author: {
    id: (root) => root._id,
    bookCount: async (root, args, { loaders }) => {
      return loaders.bookLoader.load(root._id)
      // return await Book.countDocuments({ author: root._id })
    },
  },
  Book: {
    id: (root) => root._id,
  },
}

module.exports = resolvers
