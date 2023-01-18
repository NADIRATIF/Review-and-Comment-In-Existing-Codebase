import React, {FC} from "react";
import {
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Edit,
  Delete,
} from "@mui/icons-material";

import {deleteUser} from "../../apis/user.api";
import {IUser} from "../../shared/types";
import "./style.scss";

type UserItemProps = {
  user: IUser,
  onEditClick: (user: IUser) => void,
}

export const UserRow: FC<UserItemProps> = (
  {
    user,
    onEditClick,
  }) => {

  const handleEdit = () => {
    onEditClick(user);
  }

  const handleDelete = () => {
    const confirmed = window.confirm("Do you really delete this user?");
    if (confirmed) {
      deleteUser(user._id).then();
    }
  }

  return (
    <Box
      className='user-row'
      display="grid"
      gridTemplateColumns="120px 240px 1fr 1fr 72px"
      py={1}
      pl={2}
    >
      <Typography className="full-name">{user.firstName} {user.lastName}</Typography>
      <Typography className="email">{user.email}</Typography>
      <Typography className="created-at">{new Date(user.createdAt).toLocaleString()}</Typography>
      <Typography className="updated-at">{new Date(user.createdAt).toLocaleString()}</Typography>
      <Box display="flex">
        <IconButton
          color="primary"
          size="small"
          onClick={handleEdit}
        >
          <Edit fontSize="small" />
        </IconButton>
        <IconButton
          color="warning"
          size="small"
          onClick={handleDelete}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  )
}
