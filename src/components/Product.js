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
      <p>{product.description}</p>
      <h5>{product.category}</h5>
      <p>
        quality:
        {product.quality}
      </p>
      <h6>{product.price}</h6>
    </div>
  );
};

export default Product;
