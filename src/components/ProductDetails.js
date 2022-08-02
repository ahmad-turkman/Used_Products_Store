import { useParams } from 'react-router-dom';

const ProductDetails = ({ products }) => {
  const params = useParams();
  const product = products.find((product) => {
    return product.product_id === params.productId;
  });

  let objectURL = '';
  if (product !== undefined)
    if (product.image !== undefined && product.image !== null) {
      const byteCharacters = atob(product.image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray]);
      objectURL = URL.createObjectURL(blob);
    }

  return product !== undefined ? (
    <div className="small-container single-product">
      <div className="row">
        <div className="col-2">
          <img
            src={objectURL}
            alt={product.name}
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
          <h3>Product Details:</h3>
          <p>{product.details}</p>
          <br />
          <br />
          <p>{product.upload_date}</p>
          <a href="/order" className="btn">
            Purchase &#8594;
          </a>
        </div>
      </div>
    </div>
  ) : (
    'Oop! something went worng :('
  );
};

export default ProductDetails;
