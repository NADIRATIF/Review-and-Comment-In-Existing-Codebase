import {useContext} from 'react';

import {
  Box,
  Avatar,
  Typography
} from '@mui/material';

import {AppStoreContext} from "../../../contexts/AppStoreContext";

/**
 * Header component props interface
 * @constructor
 */
const Header = () => {
  const {state} = useContext(AppStoreContext);
  const {user} = state;

  return (
      <Box height={64} paddingX={4} display='flex' alignItems='center' borderBottom={1}>
        <Avatar
          sx={{
            mr: 1,
            backgroundColor: '#002dee'
          }}
        >
          {user?.firstName.charAt(0)}{user?.lastName.charAt(0)}
        </Avatar>
        <Typography>{user?.firstName} {user?.lastName}</Typography>
      </Box>
  )
}

export default Header;
