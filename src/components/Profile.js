import { useEffect, useState } from 'react';
import AdminProducts from './AdminProducts';

const Profile = ({ products }) => {
  const [myProducts, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const a = await products.filter((product) => {
        return product.user_name === localStorage.getItem('user_name');
      });
      setProducts(a);
    };

    getProducts();
  }, [products]);
  return (
    <div>
      <h2 className="title" style={{ backgroundColor: '#fde0e0', margin: '0' }}>
        My Products
      </h2>
      <AdminProducts products={myProducts} />
    </div>
  );
};

export default Profile;
