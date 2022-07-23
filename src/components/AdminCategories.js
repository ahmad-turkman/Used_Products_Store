import GridComponent from './GridComponent';
import SideBar from './SideBar';

const columns = [
  { name: 'category_id', title: 'id' },
  { name: 'name', title: 'name' },
];

const AdminCategories = ({ categories, set }) => {
  //Edit category
  const onEdit = async (category) => {
    const res = await fetch(
      'http://localhost:8080/used_products_store/categories/update_category',
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(category),
      }
    );

    const status = await res.status;
    const data = await res.json();
    if (status === 200) {
      set([
        ...categories.filter((c) => {
          return c.category_id !== category.id;
        }),
        data,
      ]);
      alert('Category updated Succesfully!');
    }
  };
  const getRowId = (row) => row.category_id;
  const columnExtensions = [
    { columnName: 'category_id', width: 75 },
    { columnName: 'name', width: 200 },
  ];

  const disabled = [{ columnName: 'category_id', editingEnabled: false }];

  return (
    <div>
      <SideBar />
      <GridComponent
        rows={categories}
        columns={columns}
        getRowId={getRowId}
        onEdit={onEdit}
        columnExtensions={columnExtensions}
        set={set}
        id="category_id"
        disabled={disabled}
      />
    </div>
  );
};

export default AdminCategories;
