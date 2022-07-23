import { Link, useParams } from 'react-router-dom';
import Product from './Product';
import { BiSad } from 'react-icons/bi';

const CatProducts = ({ products }) => {
  const params = useParams();
  const catProducts = products.filter((product) => {
    return product.category === params.categoryName;
  });
  return (
    <div>
      <h2 className="title">{params.categoryName}</h2>
      <div className="row">
        {catProducts.length > 0 ? (
          catProducts.map((product) => (
            <Link
              key={product.product_id}
              to={`/p/${product.product_id}`}
              className="col-4"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <Product key={product.product_id} product={product} />
            </Link>
          ))
        ) : (
          <p style={{ marginBottom: '50px', fontSize: '30px' }}>
            No Products in this category{' '}
            <BiSad style={{ fontSize: '40px', marginBottom: '-10px' }} />{' '}
          </p>
        )}
      </div>
    </div>
  );
};

export default CatProducts;
