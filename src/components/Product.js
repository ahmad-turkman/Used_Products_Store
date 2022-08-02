const Product = ({ product }) => {
  let objectURL = '';
  console.log(product.image);
  if (product.image !== null && product.image !== undefined) {
    const byteCharacters = atob(product.image);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray]);
    objectURL = URL.createObjectURL(blob);
  }
  return (
    <div key={product.product_id} className="col-4">
      <img src={objectURL} alt={product.name} />
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
