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

const Dashboard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setDialogOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
    getAll()
      .then(res => {
        setUsers(res.data);
      })
  }

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
