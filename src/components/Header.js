import { HashLink } from 'react-router-hash-link';
import Navbar from './Navbar';

window.addEventListener('resize', function (event) {
  if (getWidth() > 800) {
    var MenuItems = document.getElementById('MenuItems');
    MenuItems.style.display = 'block';
  }
});

export function menutoggle() {
  var MenuItems = document.getElementById('MenuItems');
  if (MenuItems.style.display !== 'none' && getWidth() < 800) {
    MenuItems.style.display = 'none';
    return;
  }
  MenuItems.style.display = 'block';
  MenuItems.style.maxHeight = '0px';

  if (MenuItems.style.maxHeight === '0px') {
    MenuItems.style.maxHeight = '230px';
  } else {
    MenuItems.style.maxHeight = '0px';
  }
}

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

const Header = () => {
  return (
    <div className="header">
      <Navbar menutoggle={menutoggle} navstyle="navbar" />
      <div className="row">
        <div className="col-2">
          <h1>
            Make use
            <br />
            of the unused!
          </h1>
          <p>
            {' '}
            Tired of unused stuff all around your house?
            <br />
            you can Now sell them with ease!
          </p>
          <HashLink to="/#about" smooth className="btn">
            Explor Now &#8594;
          </HashLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
