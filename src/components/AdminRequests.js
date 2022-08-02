import SideBar from './SideBar';
import GridComponet from './GridComponent';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const columns = [
  { name: 'product_id', title: 'id' },
  { name: 'name', title: 'name' },
  { name: 'description', title: 'description' },
  { name: 'category', title: 'category' },
  { name: 'user_name', title: 'User' },
  { name: 'quality', title: 'quality' },
  { name: 'price', title: 'price' },
  { name: 'details', title: 'details' },
  { name: 'accepted', title: 'Accept/Reject' },
];

const AdminRequests = ({ products }) => {
  const [myProducts, set] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const a = await products.filter((product) => {
        return product.accepted === '0';
      });
      set(a);
    };

    getProducts();
  }, [products]);

  //Edit Product
  const onEdit = async (product) => {
    const res = await fetch(
      'http://localhost:8080/used_products_store/products/update_product',
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(product),
      }
    );

    const status = await res.status;
    const data = await res.json();
    if (status === 200) {
      if (!product.accepted) {
        set([
          ...myProducts.filter((p) => {
            return p.product_id !== product.id;
          }),
          data,
        ]);
        alert('Product Updated!');
      } else {
        set([
          ...myProducts.filter((p) => {
            return p.product_id !== product.id;
          }),
        ]);
        alert('Product Accepted!');
        window.location.reload();
      }
    }
  };
  const getRowId = (row) => row.product_id;
  const columnExtensions = [
    { columnName: 'details', wordWrapEnabled: true },
    { columnName: 'product_id', width: 75 },
    { columnName: 'quality', width: 100 },
    { columnName: 'price', width: 90 },
    { columnName: 'category', width: 120 },
    { columnName: 'name', width: 90 },
    { columnName: 'description', width: 160 },
    { columnName: 'accepted', width: 200 },
  ];

  const disabled = [
    { columnName: 'product_id', editingEnabled: false },
    { columnName: 'accepted', editingEnabled: false },
  ];

  const customFormatter = () => (
    <div>
      <Button
        type="button"
        style={{ backgroundColor: 'green', color: 'white', marginLeft: '10px' }}
        onClick={(e) => {
          const id =
            e.target.parentElement.parentElement.parentElement.children[1]
              .innerText;
          onEdit({ id: id, accepted: '1' });
        }}
      >
        Accept
      </Button>
      <Button
        type="button"
        style={{ backgroundColor: 'red', color: 'white', marginLeft: '20px' }}
        onClick={(e) => {
          const id =
            e.target.parentElement.parentElement.parentElement.children[1]
              .innerText;
          //Reject Product => Delete request
          const onReject = async (id) => {
            const res = await fetch(
              'http://localhost:8080/used_products_store/products/delete_product',
              {
                method: 'DELETE',
                headers: {
                  'Content-type': 'application/json',
                },
                body: JSON.stringify({ product_id: id }),
              }
            );

            const status = await res.status;
            if (status === 200) {
              set([
                ...myProducts.filter((p) => {
                  return p.product_id !== id;
                }),
              ]);
              alert('Product Rejected!');
            }
          };
          onReject(id);
        }}
      >
        Reject
      </Button>
    </div>
  );

  return (
    <div>
      <SideBar />
      <GridComponet
        rows={myProducts}
        columns={columns}
        getRowId={getRowId}
        onEdit={onEdit}
        columnExtensions={columnExtensions}
        set={set}
        id="product_id"
        disabled={disabled}
        requests={true}
        customFormatter={customFormatter}
      />
    </div>
  );
};

export default AdminRequests;
