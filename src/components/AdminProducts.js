import SideBar from './SideBar';
import GridComponet from './GridComponent';
import { useEffect, useState } from 'react';

const columns = [
  { name: 'product_id', title: 'id' },
  { name: 'name', title: 'name' },
  { name: 'description', title: 'description' },
  { name: 'category', title: 'category' },
  { name: 'user_name', title: 'User' },
  { name: 'quality', title: 'quality' },
  { name: 'price', title: 'price' },
  { name: 'details', title: 'details' },
  { name: 'upload_date', title: 'date' },
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
  <div style={{ width: '100px' }}>
    <img style={{ width: '200px' }} alt={row.name} src={parseImg(row)} />
  </div>
);

const AdminProducts = ({ products, admin, onDelete, categories }) => {
  const [myProducts, set] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const a = await products.filter((product) => {
        return product.accepted === '1';
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
      set([
        ...myProducts.filter((p) => {
          return p.product_id !== product.id;
        }),
        data,
      ]);
      alert('Product updated Succesfully!');
    }
  };

  const getRowId = (row) => row.product_id;
  const columnExtensions = [
    { columnName: 'details', wordWrapEnabled: true },
    { columnName: 'product_id', width: 75 },
    { columnName: 'quality', wordWrapEnabled: true },
    { columnName: 'price', wordWrapEnabled: true },
    { columnName: 'category_name', wordWrapEnabled: true },
    { columnName: 'name', wordWrapEnabled: true },
    { columnName: 'description', wordWrapEnabled: true },
    { columnName: 'accepted', wordWrapEnabled: true },
    { columnName: 'user_name', wordWrapEnabled: true },
  ];

  const deleteProduct = (id) => {
    const status = onDelete(id);
    if (status === 200) {
      set([
        ...myProducts.filter((p) => {
          return p.product_id !== id;
        }),
      ]);
      alert('Product Deleted!');
    }
  };

  const disabled = [{ columnName: 'product_id', editingEnabled: false }];
  return (
    <div>
      {admin ? <SideBar /> : ''}
      <GridComponet
        rows={myProducts}
        columns={columns}
        getRowId={getRowId}
        onEdit={onEdit}
        onDelete={deleteProduct}
        columnExtensions={columnExtensions}
        set={set}
        id="product_id"
        disabled={disabled}
        RowDetail={RowDetail}
        categories={categories}
      />
    </div>
  );
};

export default AdminProducts;
