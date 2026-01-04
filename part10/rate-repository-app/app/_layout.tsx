import { ApolloProvider } from "@apollo/client/react";
import { NativeRouter } from "react-router-native";

import AuthStorageContext from "@/src/contexts/AuthStorageContext";
import AuthStorage from "@/src/utils/authStorage";
import Main from "../src/components/Main";
import createApolloClient from "../src/utils/apolloClient";

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext value={authStorage}>
          <Main />
        </AuthStorageContext>
      </ApolloProvider>
    </NativeRouter>
  );
}
