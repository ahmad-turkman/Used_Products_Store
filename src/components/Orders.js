import { Button } from '@mui/material';
import GridComponent from './GridComponent';

const columns = [
  { name: 'order_id', title: 'id' },
  { name: 'status', title: 'status' },
  { name: 'date', title: 'date' },
  { name: 'name', title: 'product' },
  { name: 'bla', title: ' ' },
];

const Orders = ({ orders }) => {
  const getRowId = (row) => row.order_id;
  // const columnExtensions = [

  // ];

  const customFormatter = ({ order }) => (
    <div>
      <Button
        type="button"
        style={{
          backgroundColor: '#ff523b',
          color: 'white',
          marginLeft: '30px',
        }}
        onClick={(e) => {
          const id =
            e.target.parentElement.parentElement.parentElement.children[0]
              .innerText;
          window.location.pathname = `/order/${id}`;
        }}
      >
        View
      </Button>
    </div>
  );

  return (
    <div>
      <GridComponent
        rows={orders}
        columns={columns}
        getRowId={getRowId}
        // columnExtensions={columnExtensions}
        id="order_id"
        requests={true}
        customFormatter={customFormatter}
      />
    </div>
  );
};

export default Orders;
