import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import GridComponent from './GridComponent';
import SideBar from './SideBar';

const columns = [
  { name: 'user_name', title: 'user_name' },
  { name: 'first_name', title: 'First Name' },
  { name: 'last_name', title: 'Last Name' },
  { name: 'email', title: 'Email' },
  { name: 'reset', title: 'reset Password' },
  { name: 'phone_number', title: 'Phone Number' },
  { name: 'is_admin', title: 'Admin' },
  { name: 'rate', title: 'Rate' },
];

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };

    getUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(
      'http://localhost:8080/used_products_store/users/get_all_users'
    );
    const data = await res.json();
    return data;
  };

  //Edit user
  const onEdit = async (user) => {
    const res = await fetch(
      'http://localhost:8080/used_products_store/users/update_user',
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );

    const status = await res.status;
    const data = await res.json();
    if (status === 200) {
      setUsers([
        ...users.filter((u) => {
          return u.user_name !== user.id;
        }),
        data,
      ]);
      alert('User updated Succesfully!');
    }
  };

  //Delete User
  const onDelete = async (user_name) => {
    const res = await fetch(
      'http://localhost:8080/used_products_store/users/delete_user',
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ user_name: user_name }),
      }
    );

    const status = await res.status;

    if (status === 200) {
      setUsers([
        ...users.filter((user) => {
          return user.user_name !== user_name;
        }),
      ]);
      alert('User Deleted Succesfully!');
    }
  };

  // Reset Password
  const onReset = async (user_name, password) => {
    const res = await fetch(
      'http://localhost:8080/used_products_store/users/reset_password',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ user_name: user_name, password: password }),
      }
    );

    const status = await res.status;

    if (status === 200) {
      alert('Password Reset Successfully');
    }
  };

  const getRowId = (row) => row.user_name;
  const columnExtensions = [
    { columnName: 'user_name', width: 120 },
    { columnName: 'first_name', width: 140 },
    { columnName: 'rate', width: 75 },
    { columnName: 'is_admin', width: 100 },
    { columnName: 'last_name', width: 140 },
    { columnName: 'phone_number', width: 140 },
    { columnName: 'reset', width: 150 },
    { columnName: 'email', width: 200 },
  ];

  const customFormatter = () => (
    <div>
      <Button
        type="button"
        style={{ backgroundColor: 'gray', color: 'white', marginLeft: '30px' }}
        onClick={(e) => {
          const user_name =
            e.target.parentElement.parentElement.parentElement.children[1]
              .innerText;
          const password = window.prompt('Please Enter the new password:');
          onReset(user_name, password);
        }}
      >
        Reset
      </Button>
    </div>
  );

  const disabled = [{ columnName: 'reset', editingEnabled: false }];

  return (
    <div>
      <SideBar />
      <GridComponent
        rows={users}
        columns={columns}
        getRowId={getRowId}
        onEdit={onEdit}
        onDelete={onDelete}
        columnExtensions={columnExtensions}
        set={setUsers}
        id="user_name"
        booleanColumns="is_admin"
        customFormatter={customFormatter}
        disabled={disabled}
      />
    </div>
  );
};

export default AdminUsers;
