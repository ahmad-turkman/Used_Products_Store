import { useParams } from 'react-router-dom';

const ProductDetails = ({ products }) => {
  const params = useParams();
  const product = products.find((product) => {
    return product.product_id === params.productId;
  });
  return product !== undefined ? (
    <div className="small-container single-product">
      <div className="row">
        <div className="col-2">
          <img
            src={require('../images/gallery-1.jpg')}
            alt=""
            width="100%"
            id="ProductImg"
          />
        </div>
        <div className="col-2">
          <p>
            {product.category} / {product.name}
          </p>
          <br />
          <p>Posted by: {product.user_name}</p>
          <br />
          <p>quality: {product.quality}</p>
          <h1>{product.description}</h1>
          <h4>{product.price}</h4>
          <h3>Product Details</h3>
          <p>{product.details}</p>
        </div>
      </div>
    </div>
  ) : (
    'Oop! something went worng :('
  );
};

export default ProductDetails;
