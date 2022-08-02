import {
  Button,
  ButtonBase,
  Chip,
  IconButton,
  Input,
  MenuItem,
  Select,
  styled,
} from '@mui/material';
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
  onDelete,
  columnExtensions,
  set,
  id,
  disabled,
  booleanColumns,
  requests,
  customFormatter,
}) => {
  const commitChanges = ({ changed, deleted }) => {
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
      onDelete(deleted[0]);
    }
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

  const CustomTypeProvider = (props) => (
    <DataTypeProvider formatterComponent={customFormatter} {...props} />
  );

  const RequestCusCols = ['accepted'];
  const usersCusCols = ['reset'];

  ////////////////////////////////////////////////////

  const compareId = (a, b) => {
    if (parseInt(a) === parseInt(b)) {
      return 0;
    }
    return parseInt(a) < parseInt(b) ? -1 : 1;
  };

  const sortingColumnExtensions = [{ columnName: id, compare: compareId }];

  ///////////////////////////////////////////
  const PREFIX = 'Demo';
  const classes = {
    button: `${PREFIX}-button`,
  };
  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    [`&.${classes.button}`]: {
      position: 'absolute',
      right: '500px',
      width: '50px',
      height: '20px',
      color: 'blue',
    },
  }));

  const TableHeaderContent = ({ column, children, ...restProps }) => (
    <TableHeaderRow.Content column={column} {...restProps}>
      {children}
      {column.name === 'category_id' ? (
        <StyledIconButton
          className="newCategory"
          onClick={(e) => {
            let name = window.prompt('Enter Category Name');
            if (name === null || name === '')
              alert('Category Name cannot be empty!');
            else {
              const onAdd = async (name) => {
                const res = await fetch(
                  'http://localhost:8080/used_products_store/categories/add_category',
                  {
                    method: 'POST',
                    headers: {
                      'Content-type': 'application/json',
                    },
                    body: JSON.stringify({ name: name }),
                  }
                );

                const status = await res.status;
                const data = await res.json();
                if (status === 200) {
                  set([...rows, data]);
                  alert('Category Added Succesfully!');
                }
              };
              onAdd(name);
            }
          }}
          size="large"
        >
          New
        </StyledIconButton>
      ) : null}
    </TableHeaderRow.Content>
  );

  //////////////////////////////////////////
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
            <IntegratedSorting columnExtensions={sortingColumnExtensions} />
            <BooleanTypeProvider for={boolCols} />
            <CustomTypeProvider for={RequestCusCols} />
            <CustomTypeProvider for={usersCusCols} />
            <EditingState
              onCommitChanges={commitChanges}
              columnExtensions={disabled}
            />
            <Table
              columnExtensions={columnExtensions}
              headComponent={TableComponent}
            />
            <TableHeaderRow
              showSortingControls
              contentComponent={TableHeaderContent}
            />
            <TableEditRow />
            <TableEditColumn
              showEditCommand
              showDeleteCommand={!requests ? true : false}
            />
            <Toolbar />
            <SearchPanel />
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default GridComponent;
