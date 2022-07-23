const Offer = () => {
  return (
    <div className="offer">
      <div className="small-container">
        <div className="row">
          <div className="col-2">
            <img
              src={require('../images/exclusive.png')}
              alt="offer"
              className="offer-img"
            />
          </div>
          <div className="col-2">
            <p>Exclusively Available in our Store</p>
            <h1>Smart Band 4</h1>
            <p>
              The Mi Smart Band 4 features a 39.9% larger (than Mi Band 3)
              AMOLED color full-touch display with adjustable brightness,so
              everything is clear as can be.
            </p>
            <a href="" className="btn">
              Buy Now &#8594;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
