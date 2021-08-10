import { useContext } from "react";
import { CartCtx } from "../Context/CartContext/CartContext";
import "./Header.css";

const Header = ({ products, setProducts, categories }) => {
  const [list] = useContext(CartCtx);

  return (
    <>
      <nav className="product-filter">
        <h1>Jackets</h1>

        <div className="sort">
          <div className="collection-sort">
            <label>Filter by:</label>
            <select onChange={setProducts}>
              {categories.map((categorie) => (
                <option key={categorie} value={categorie}>
                  {categorie}
                </option>
              ))}
            </select>
          </div>

          <div className="collection-sort">
            <label>Sort by:</label>
            <select>
              <option value="/">Featured</option>
              <option value="/">Best Selling</option>
              <option value="/">Alphabetically, A-Z</option>
              <option value="/">Alphabetically, Z-A</option>
              <option value="/">Price, low to high</option>
              <option value="/">Price, high to low</option>
              <option value="/">Date, new to old</option>
              <option value="/">Date, old to new</option>
            </select>
          </div>
        </div>
      </nav>
      <div>{list}</div>
    </>
  );
};

export default Header;
