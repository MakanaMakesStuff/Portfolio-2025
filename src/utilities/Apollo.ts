import { HttpLink } from "@apollo/client"
import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://www.makanaedwards.com/index.php?graphql",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
})

export default client
