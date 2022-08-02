import { Link } from 'react-router-dom';

const Categories = ({ categories }) => {
  return (
    <>
      <h2 className="title">Categories</h2>
      <div className="row">
        {categories.map((category) => (
          <Link
            key={category.category_id}
            to={`/c/${category.name}`}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <div>
              <div className="col-4 category btn">{category.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Categories;
