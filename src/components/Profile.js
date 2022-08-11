import { useEffect, useState } from 'react';
import AdminProducts from './AdminProducts';
import Orders from './Orders';

const Profile = ({ products, orders }) => {
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

  const [myOrders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      const a = await orders.filter((order) => {
        return order.user.user_name === localStorage.getItem('user_name');
      });

      const rows = a.map((order) => {
        return { ...order, name: order.product.name };
      });

      setOrders(rows);
    };

    getOrders();
  }, [orders]);

  return (
    <div>
      <h2 className="title" style={{ backgroundColor: '#fde0e0', margin: '0' }}>
        My Products
      </h2>
      <AdminProducts products={myProducts} />
      <h2 className="title" style={{ backgroundColor: '#fde0e0', margin: '0' }}>
        My Orders
      </h2>
      <Orders orders={myOrders} />
    </div>
  );
};

export default Profile;
