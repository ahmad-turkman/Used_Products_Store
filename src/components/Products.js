// import { FaStar } from 'react-icons/fa';
// import { FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Product from './Product';

const Products = ({ products, title }) => {
  return (
    <>
      <h2 className="title">{title}</h2>
      <div className="row">
        {products.length > 0
          ? products
              .filter((product) => {
                return product.accepted === '1';
              })
              .map((product) => (
                <Link
                  key={product.product_id}
                  to={`/p/${product.product_id}`}
                  className="col-4"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <Product product={product} />
                </Link>
              ))
          : 'No Products to show'}
      </div>
    </>
  );
};

export default Products;
