import ImgMediaCard from './ImgMediaCard';

const Offers = () => {
  return (
    <>
      <h2 id="offers" className="title">
        Explore our Offers
      </h2>
      <div className="row">
        <div className="col-3">
          <ImgMediaCard
            title="show for one week"
            details="This offer allows you to show your product in our store for one week. Don't foget! your first week is free!"
            num="$9.99"
            img={require('../images/one_week.png')}
          />
        </div>
        <div className="col-3">
          <ImgMediaCard
            title="Featured Product"
            details="Featured products will appear first to visitors. You can get this offer for one week."
            num="$19.0"
            img={require('../images/featured.png')}
          />
        </div>
        <div className="col-3">
          <ImgMediaCard
            title="Execlusive Product"
            details="Execlusive products will appear individually for two days at the top of the store."
            num="$15.0"
            img={require('../images/execlusive.png')}
          />
        </div>
      </div>
    </>
  );
};

export default Offers;
