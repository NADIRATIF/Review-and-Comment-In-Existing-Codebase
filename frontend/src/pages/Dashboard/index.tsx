import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Typography
} from '@mui/material';

import {UserRow} from "../../components/UserRow";
import {UserDialog} from "../../components/UserDialog";

import {getAll} from '../../apis/user.api';
import {IUser} from "../../shared/types";

/**
 * Dashboard page component
 * @constructor
 * @return {JSX.Element}
 */
const Dashboard = () => {
  /**
   * Users state variable
   * @type {[IUser[], Function]}
   * @private
   * @const
   * @default []
   * @property {IUser[]} users - Users
   */
  const [users, setUsers] = useState<IUser[]>([]);

  /**
   * selected user state variable
   * @type {[IUser | null, Function]}
   * @private
   * @const
   * @default null
   * @property {IUser | null} selectedUser - Selected user
   */
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  /**
   * dialog open state variable
   * @type {[boolean, Function]}
   * @private
   * @const
   * @default false
   * @property {boolean} dialogOpen - Dialog open
   */
  const [dialogOpen, setDialogOpen] = useState(false);

  /**
   * handle edit user click
   * @param {IUser} user - User
   * @private
   * @const
   */
  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setDialogOpen(true);
  }

  /**
   * handle dialog close event
   * @private
   * @const
   */
  const handleDialogClose = () => {
    setDialogOpen(false);
    getAll()
      .then(res => {
        setUsers(res.data);
      })
  }

  /**
   * use effect hook to fetch users
   */
  useEffect(() => {
    getAll()
      .then(res => {
        setUsers(res.data);
      })
  }, []);

  return (
    <Box
      p={4}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">User Management</Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => setDialogOpen(true)}
        >
          Create User
        </Button>
      </Box>
      <Box className="user-list" mt={4}>
        <Box
          display="grid"
          gridTemplateColumns="120px 240px 1fr 1fr 72px"
          py={1}
          pl={2}
          sx={{
            borderBottom: "1px solid gray",
            '&> p': {fontWeight: 'bold'}
          }}
        >
          <Typography>User Name</Typography>
          <Typography>Email</Typography>
          <Typography>Created Time</Typography>
          <Typography>Updated Time</Typography>

        </Box>
        {users.map((user, index) => (
          <UserRow
            key={index}
            user={user}
            onEditClick={(user) => handleEdit(user)}
          />
        ))}
      </Box>
      <UserDialog
        user={selectedUser}
        open={dialogOpen}
        onClose={handleDialogClose}
      />
    </Box>
  )
}

export default Dashboard;
