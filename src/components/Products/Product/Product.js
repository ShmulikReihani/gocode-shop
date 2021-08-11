import { useContext, useState } from "react";
import { CartCtx } from "../../Context/CartContext/CartContext";
import "./Product.css";

const Product = ({ title, image, price, id }) => {
  const [list, setList] = useContext(CartCtx);
  const [isAdd, setIsAdd] = useState(true);

  function listHandler(product) {
    if (isAdd) {
      setIsAdd(false);
      setList([...list, product.id]);
    } else {
      setIsAdd(true);
      setList((prev) => prev.filter((item) => item !== product.id));
    }
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={"/"} />
      </div>
      <div className="product-info">
        <h5>{title}</h5>
        <h6>{price}</h6>
        <button onClick={() => listHandler({ id, title, image, price })}>
          {isAdd ? "ADD" : "REMOVE"}
        </button>
      </div>
    </div>
  );
};

export default Product;
