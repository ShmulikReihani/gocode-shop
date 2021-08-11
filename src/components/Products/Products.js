import Product from "./Product/Product";
import "./Products.css";

const Products = ({ products }) => {
  return (
    <>
      <section className="products">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </section>
    </>
  );
};

export default Products;
