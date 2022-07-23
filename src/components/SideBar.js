import { BiCheck, BiListCheck, BiPackage, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const data = [
  {
    title: 'Users',
    icon: <BiUser />,
    link: '/admin/users',
  },
  {
    title: 'Products',
    icon: <BiPackage />,
    link: '/admin/products',
  },
  {
    title: 'Categories',
    icon: <BiListCheck />,
    link: '/admin/categories',
  },
  {
    title: 'Requests',
    icon: <BiCheck />,
    link: '/admin/requests',
  },
];

const SideBar = () => {
  return (
    <div className="sidebar">
      <ul className="side-list">
        {data.map((val, key) => {
          return (
            <Link key={key} to={val.link}>
              <li
                className="item tooltip"
                id={window.location.pathname === val.link ? 'active' : ''}
              >
                <div className="tooltiptext">{val.title}</div>
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
