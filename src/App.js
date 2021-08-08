import "./App.css";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import { useState, useEffect } from "react";
import Spinner from "./components/UI/Spinner/Spinner";

function App() {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setSpinner((prev) => !prev);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilterProducts(data);
        setSpinner((prev) => !prev);
      });
  }, []);

  return (
    <div className="App">
      <Header products={products} setProducts={setFilterProducts} />
      {spinner ? <Spinner /> : <Products products={filterProducts} />}
    </div>
  );
}

export default App;
