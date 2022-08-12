// import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GridComponent from './GridComponent';

const Order = ({ onDelete }) => {
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
    ['rated', 'Done'],
  ]);

  const changeStatus = async () => {
    const res = await fetch(
      'http://localhost:8080/used_products_store/orders',
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          id: order.order_id,
          status: statusMap.get(order.status),
        }),
      }
    );

    const status = await res.status;
    const data = await res.json();
    if (status === 200) {
      setOrders([
        ...orders.filter((o) => {
          return o.order_id !== order.order_id;
        }),
        data,
      ]);
    }
  };

  const columns = [
    { name: 'order_id', title: 'id' },
    { name: 'status', title: 'status' },
    { name: 'date', title: 'date' },
  ];

  const parseImg = (product) => {
    let objectURL = '';
    if (product !== undefined)
      if (product.image !== undefined && product.image !== null) {
        const byteCharacters = atob(product.image);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray]);
        objectURL = URL.createObjectURL(blob);
        return objectURL;
      }
  };
  const RowDetail = ({ row }) => (
    <div className="small-container single-product">
      <div className="row">
        <div className="col-2">
          <img
            src={parseImg(row.product)}
            alt={row.product.name}
            width="100%"
            id="ProductImg"
          />
        </div>
        <div className="col-2">
          <p>
            {row.product.category} / {row.product.name}
          </p>
          <br />
          <p>Posted by: {row.product.user_name}</p>
          <br />
          <p>quality: {row.product.quality}</p>
          <h1>{row.product.description}</h1>
          <h4>{row.product.price}</h4>
          <h3>Product Details:</h3>
          <p>{row.product.details}</p>
          <br />
          <br />
          <p>{row.product.upload_date}</p>
        </div>
      </div>
    </div>
  );

  //Delete Order
  const deleteOrder = async (id) => {
    const res = await fetch(
      'http://localhost:8080/used_products_store/orders',
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      }
    );

    const status = await res.status;

    if (status === 200) {
      window.location.pathname = '/';
      setOrders([
        ...orders.filter((o) => {
          return o.order_id !== id;
        }),
      ]);
    }
    return status;
  };

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
                  order.status === 'received' ||
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
                  order.status === 'received' ||
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
                  order.status === 'received' ||
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
                  order.status === 'received' || order.status === 'rated'
                    ? 'step completed'
                    : 'step'
                }
              >
                <div className="step-icon-wrap">
                  <div className="step-icon">
                    <i className="pe-7s-home"></i>
                  </div>
                </div>
                <h4 className="step-title">Received</h4>
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
          <div
            className="text-left text-sm-right"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {order.status === 'rated' ? (
              <h2>Order Fullfilled!</h2>
            ) : (
              <button
                className="btn btn-outline-primary btn-rounded btn-sm"
                onClick={changeStatus}
              >
                {buttonMap.get(order.status)}
              </button>
            )}
            {order.status !== 'paid' ||
            order.status !== 'received' ||
            order.status !== 'rated' ? (
              <button
                className="btn"
                onClick={() => {
                  if (
                    window.confirm('Are you sure you want to cancel the order?')
                  )
                    deleteOrder(order.order_id);
                }}
              >
                Cancel Order
              </button>
            ) : (
              ''
            )}
            <br />
          </div>
        </div>
        <div>
          <h1 style={{ marginTop: '60px', marginBottom: '-40px' }}>Details:</h1>
          <GridComponent
            rows={[order]}
            columns={columns}
            order={true}
            requests={true}
            RowDetail={RowDetail}
          />
        </div>
      </div>
    </div>
  ) : (
    'Oops! Something went wrong!'
  );
};

export default Order;
