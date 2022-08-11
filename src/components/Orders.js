import GridComponent from './GridComponent';

const columns = [
  { name: 'order_id', title: 'id' },
  { name: 'status', title: 'status' },
  { name: 'date', title: 'date' },
  { name: 'name', title: 'product' },
];

const Orders = ({ orders }) => {
  const getRowId = (row) => row.order_id;
  // const columnExtensions = [

  // ];

  return (
    <div>
      <GridComponent
        rows={orders}
        columns={columns}
        getRowId={getRowId}
        // columnExtensions={columnExtensions}
        id="order_id"
        requests={true}
      />
    </div>
  );
};

export default Orders;
