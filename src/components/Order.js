// import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const orders = await fetchOrders();
      setOrders(orders);
    };

    getOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch('http://localhost:8080/used_products_store/orders');
    const data = await res.json();
    return data;
  };

  const params = useParams();
  const order = orders.find((order) => {
    return order.order_id === params.orderId;
  });

  const statusMap = new Map([
    ['requested', 'revised'],
    ['revised', 'confirmed'],
    ['confirmed', 'paid'],
    ['paid', 'received'],
    ['received', 'rated'],
  ]);

  const buttonMap = new Map([
    ['requested', 'Revise'],
    ['revised', 'Confirm'],
    ['confirmed', 'Pay'],
    ['paid', 'Receive'],
    ['received', 'Rate'],
  ]);

  return order !== undefined ? (
    <div className="main_container">
      <div className="container padding-bottom-3x mb-1">
        <div className="card mb-3">
          <div className="p-4 text-center text-white text-lg bg-dark rounded-top">
            <span className="text-uppercase">Tracking Order No - </span>
            <span className="text-medium">{order.order_id}</span>
          </div>
          <div className="d-flex flex-wrap flex-sm-nowrap justify-content-between py-3 px-2 bg-secondary">
            <div className="w-100 text-center py-1 px-2">
              <span className="text-medium">Shipped Via:</span>{' '}
              {order.product.user_name}
            </div>
            <div className="w-100 text-center py-1 px-2">
              <span className="text-medium">Status:</span> {order.status}
            </div>
          </div>
          <div className="card-body">
            <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
              <div className="step completed">
                <div className="step-icon-wrap">
                  <div className="step-icon">
                    <i className="pe-7s-cart"></i>
                  </div>
                </div>
                <h4 className="step-title">Requested</h4>
              </div>
              <div
                className={
                  order.status === 'revised' ||
                  order.status === 'confirmed' ||
                  order.status === 'paid' ||
                  order.status === 'receievd' ||
                  order.status === 'rated'
                    ? 'step completed'
                    : 'step'
                }
              >
                <div className="step-icon-wrap">
                  <div className="step-icon">
                    <i className="pe-7s-config"></i>
                  </div>
                </div>
                <h4 className="step-title">Revised</h4>
              </div>
              <div
                className={
                  order.status === 'confirmed' ||
                  order.status === 'paid' ||
                  order.status === 'receievd' ||
                  order.status === 'rated'
                    ? 'step completed'
                    : 'step'
                }
              >
                <div className="step-icon-wrap">
                  <div className="step-icon">
                    <i className="pe-7s-check"></i>
                  </div>
                </div>
                <h4 className="step-title">Confirmed</h4>
              </div>
              <div
                className={
                  order.status === 'paid' ||
                  order.status === 'receievd' ||
                  order.status === 'rated'
                    ? 'step completed'
                    : 'step'
                }
              >
                <div className="step-icon-wrap">
                  <div className="step-icon">
                    <i className="pe-7s-cash"></i>
                  </div>
                </div>
                <h4 className="step-title">Paid</h4>
              </div>
              <div
                className={
                  order.status === 'receievd' || order.status === 'rated'
                    ? 'step completed'
                    : 'step'
                }
              >
                <div className="step-icon-wrap">
                  <div className="step-icon">
                    <i className="pe-7s-home"></i>
                  </div>
                </div>
                <h4 className="step-title">Delivered</h4>
              </div>
              <div
                className={order.status === 'rated' ? 'step completed' : 'step'}
              >
                <div className="step-icon-wrap">
                  <div className="step-icon">
                    <i className="pe-7s-star"></i>
                  </div>
                </div>
                <h4 className="step-title">Seller Rated</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-sm-between align-items-center">
          <div className="text-left text-sm-right">
            <button className="btn btn-outline-primary btn-rounded btn-sm">
              {buttonMap.get(order.status)}
            </button>
            <br />
            <button className="btn btn-outline-primary btn-rounded btn-sm">
              View Order Details
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    'Oops! Something went wrong!'
  );
};

export default Order;
