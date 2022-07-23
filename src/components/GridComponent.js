import { Button, Chip, Input, MenuItem, Select, styled } from '@mui/material';
import '../admin.css';
import {
  DataTypeProvider,
  EditingState,
  IntegratedFiltering,
  IntegratedSorting,
  SearchState,
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  Toolbar,
  SearchPanel,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@mui/material/Paper';

const StyledTable = styled(Table.TableHead)(({ theme }) => ({
  backgroundColor: 'lightgray',
}));

const TableComponent = (props) => <StyledTable {...props} />;

const GridComponent = ({
  rows,
  columns,
  getRowId,
  onEdit,
  columnExtensions,
  set,
  id,
  disabled,
  booleanColumns,
}) => {
  const commitChanges = ({ changed, deleted }) => {
    let changedRows;
    const data = () => {
      for (let key in changed) {
        if (changed.hasOwnProperty(key)) {
          var out = changed[key];
          out.id = key;
        }
      }
      return out;
    };

    if (changed) {
      console.log('Edit', data());
      onEdit(data());
    }
    if (deleted) {
      console.log('delete', deleted);
      const deletedSet = new Set(deleted);
      changedRows = rows.filter((row) => !deletedSet.has(row.id));
    }
    // setRows(changedRows);
  };

  const BooleanFormatter = ({ value }) => (
    <Chip label={value == '1' ? 'Yes' : 'No'} />
  );

  const BooleanEditor = ({ value, onValueChange }) => (
    <Select
      input={<Input />}
      value={value == '1' ? 'Yes' : 'No'}
      onChange={(event) => onValueChange(event.target.value === 'Yes' ? 1 : 0)}
      style={{ width: '100%' }}
    >
      <MenuItem value="Yes">Yes</MenuItem>
      <MenuItem value="No">No</MenuItem>
    </Select>
  );

  const BooleanTypeProvider = (props) => (
    <DataTypeProvider
      formatterComponent={BooleanFormatter}
      editorComponent={BooleanEditor}
      {...props}
    />
  );

  const boolCols = [booleanColumns];

  ///////////////////////////////////////////////////
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
                ...rows.filter((p) => {
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

  const CustomTypeProvider = (props) => (
    <DataTypeProvider formatterComponent={customFormatter} {...props} />
  );

  const cusCols = ['accepted'];

  ////////////////////////////////////////////////////

  return (
    <div className="account-page">
      <div style={{ margin: '60px' }}>
        <Paper>
          <Grid rows={rows} columns={columns} getRowId={getRowId}>
            <SearchState />
            <IntegratedFiltering />
            <SortingState
              defaultSorting={[{ columnName: id, direction: 'asc' }]}
            />
            <IntegratedSorting />
            <BooleanTypeProvider for={boolCols} />
            <CustomTypeProvider for={cusCols} />

            <EditingState
              onCommitChanges={commitChanges}
              columnExtensions={disabled}
            />
            <Table
              columnExtensions={columnExtensions}
              headComponent={TableComponent}
            />
            <TableHeaderRow showSortingControls />
            <TableEditRow />
            <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
            <Toolbar />
            <SearchPanel />
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default GridComponent;
