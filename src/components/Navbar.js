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
          {localStorage.getItem('user_name') ? (
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
          ) : (
            ''
          )}
          {localStorage.getItem('admin') === '1' ? (
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
          ) : (
            ''
          )}
          {localStorage.getItem('user_name') ? (
            <li>
              <Link
                to=""
                onClick={() => {
                  if (window.confirm('Are you sure you want to logout?')) {
                    localStorage.clear();
                    window.location.pathname = '/';
                  }
                }}
              >
                Logout
              </Link>
            </li>
          ) : (
            ''
          )}
          {!localStorage.getItem('user_name') ? (
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
          ) : (
            <li>
              <Link
                to="/profile"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                {localStorage.getItem('fname')} {localStorage.getItem('lname')}
              </Link>
            </li>
          )}
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
