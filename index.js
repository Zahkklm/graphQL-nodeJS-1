const {ApolloServer, gql} = require("apollo-server")
const {ApolloServerPluginLandingPageGraphQLPlayground} = require("apollo-server-core")
const {books, authors} = require("./fakedata");

const typeDefs = gql`
    type Query {
        books(filter: String): [Book!]
        authors: [Author!]
        book(id: ID, title: String): Book!
        author(id: ID!): Author!
    }
 
    type User {
        name: String!
        surname: String!
        age: Int
    }

    type Book {
        id: ID!
        title: String!
        author: Author!
        author_id: ID!
        score: Float
        isPublished: Boolean
    }

    type Author {
        id: ID!
        name: String!
        surname: String
        age: Int
        books(filter: String): [Book!]
    }
`;

const resolvers = {
    Query: {
        books: (parents, args) => books.filter(b => b.title.includes(args.filter)),
        book: (parents, args) => {
            if(args.id) {
                const data = books.find((b) => b.id == args.id)
                return data    
            } else if(args.title) {
                const data = books.find((b) => b.title === args.title)
                return data    
            }
        },
        authors: () => authors,
        author: (parents, args) => {
            const data = authors.find(a => a.id === args.id)
            return data
        },
    },
    Book: {
        author: (parents, args) => {
            return authors.find(a => a.id === parents.author_id)
        }
    },
    Author: {
        books: (parents, args) => {
            let filtered = books.filter(b => b.author_id === parents.id)
            if(args.filter) {
                filtered = filtered.filter(fbook => fbook.title.toLowerCase().startsWith(args.filter.toLowerCase()))
            }
            return filtered
        }
    }
}

const server = new ApolloServer({
    typeDefs, 
    resolvers, 
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({})
    ]
})

const startServer = async () => {
    const {url} = await server.listen(8080)
    console.log("graphql server is up at "+url)
}

startServer()

    