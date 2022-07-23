const Product = ({ product }) => {
  return (
    <div key={product.product_id} className="col-4">
      <img src={require('../images/product-1.jpg')} alt={product.name} />
      <h2>{product.name}</h2>
      {/* <div className="rating">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
          </div> */}
      <h4>{product.category}</h4>
      <p>Posted by: {product.user_name}</p>
      <p>{product.description}</p>

      <p>quality: {product.quality}</p>
      <h3>{product.price}</h3>
    </div>
  );
};

export default Product;
