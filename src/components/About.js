import ImgMediaCard from './ImgMediaCard';

const About = () => {
  return (
    <>
      <h2 id="about" className="title">
        How It Works
      </h2>
      <div className="row">
        <div className="col-3">
          <ImgMediaCard
            title="Signup"
            details="Create your free account now in few steps, click Signup and follow the instructions. "
            num={1}
            img={require('../images/user-1.png')}
          />
        </div>
        <div className="col-3">
          <ImgMediaCard
            title="upload a product"
            details="Post your used product without any charge for one week, or you can choose one of our offers."
            num={2}
            img={require('../images/user-2.png')}
          />
        </div>
        <div className="col-3">
          <ImgMediaCard
            title="wait for buyers"
            details="visitors can show your product and buy it. Wait for one, negotiate, deliver and take your cash."
            num={3}
            img={require('../images/user-3.png')}
          />
        </div>
      </div>
    </>
  );
};

export default About;
