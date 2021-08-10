import "./App.css";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import { useState, useEffect } from "react";
import Spinner from "./components/UI/Spinner/Spinner";
import { CartContext } from "./components/Context/CartContext/CartContext";

function App() {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const [categories, setCategories] = useState([]);

  function handlerFilter(event) {
    setFilterProducts(
      products.filter((product) => product.category === event.target.value)
    );
  }

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

  useEffect(() => {
    setCategories(
      products
        .map((p) => p.category)
        .filter((value, index, array) => array.indexOf(value) === index)
    );
  }, [products]);

  console.log(categories);

  return (
    <CartContext>
      <div className="App">
        <Header setProducts={handlerFilter} categories={categories} />
        {spinner ? <Spinner /> : <Products products={filterProducts} />}
      </div>
    </CartContext>
  );
}

export default App;
