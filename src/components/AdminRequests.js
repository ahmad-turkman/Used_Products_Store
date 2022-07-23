import SideBar from './SideBar';
import GridComponet from './GridComponent';
import { useEffect, useState } from 'react';

const columns = [
  { name: 'product_id', title: 'id' },
  { name: 'name', title: 'name' },
  { name: 'description', title: 'description' },
  { name: 'category', title: 'category' },
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
    { columnName: 'price', width: 100 },
    { columnName: 'category', width: 120 },
    { columnName: 'name', width: 130 },
    { columnName: 'description', width: 160 },
    { columnName: 'accepted', width: 200 },
  ];

  const disabled = [
    { columnName: 'product_id', editingEnabled: false },
    { columnName: 'accepted', editingEnabled: false },
  ];
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
      />
    </div>
  );
};

export default AdminRequests;
