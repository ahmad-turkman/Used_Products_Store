const Execlusive = () => {
  return (
    <div className="execlusive">
      <div className="small-container">
        <div className="row">
          <div className="col-2">
            <img
              src={require('../images/exclusive.png')}
              alt="Execlusive"
              className="execlusive-img"
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
              Purchase Now &#8594;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Execlusive;
