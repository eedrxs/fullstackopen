import { gql } from "@apollo/client"

const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query AllBooks($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author) {
      id
      title
      published
      genres
      author {
        name
      }
    }
  }
`

const ME = gql`
  query Me {
    me {
      id
      username
      favoriteGenre
    }
  }
`

const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      id
      title
      published
      genres
      author {
        name
      }
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export default { ALL_AUTHORS, ALL_BOOKS, ME, ADD_BOOK, EDIT_AUTHOR, LOGIN }
