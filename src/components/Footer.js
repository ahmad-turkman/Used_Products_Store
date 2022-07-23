const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col-2">
            <img src={require('../images/logo3.png')} alt="logo" />
            <p>
              Our Purpose Is To Make Buying And Selling used stuff easy and in
              one place
            </p>
          </div>
          <div className="footer-col-4">
            <h3>Follow Us</h3>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="copyright">Copyright 2022 - Nass-Turk</p>
      </div>
    </div>
  );
};

export default Footer;
