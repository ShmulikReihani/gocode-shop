import Header from "./components/Header/Header";
import { CartContext } from "./Context/CartContext/CartContext";
import { Container } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import ProductDetails from "./views/ProductDetails";

function App() {
  return (
    <CartContext>
      <Header />
      <Container fixed>
        <Switch>
          <Route path="/products/:id">
            <ProductDetails />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </CartContext>
  );
}

export default App;
