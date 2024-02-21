import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Title from "./components/layout/Title";
import Home from "./pages/Home";
import ShowPage from "./pages/ShowPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/person/:personId",
    element: <ShowPage />,
  },
]);

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Title />
        <RouterProvider router={router} />
      </ApolloProvider>
    </div>
  );
}

export default App;
