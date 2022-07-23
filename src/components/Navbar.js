import { Link } from 'react-router-dom';

const Navbar = ({ menutoggle, navstyle }) => {
  return (
    <div className={navstyle}>
      <div className="logo">
        <Link
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img src={require('../images/logo3.png')} alt="logo" width="125px" />
        </Link>
      </div>
      <nav>
        <ul id="MenuItems">
          <li>
            <Link
              to="/"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/add"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Add New Product +
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Admin
            </Link>
          </li>
          <li>
            <a
              href="/account"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Login | Signup
            </a>
          </li>
        </ul>
      </nav>
      <img
        src={require('../images/menu.png')}
        alt="menu"
        className="menu-icon"
        onClick={menutoggle}
      />
    </div>
  );
};

export default Navbar;
