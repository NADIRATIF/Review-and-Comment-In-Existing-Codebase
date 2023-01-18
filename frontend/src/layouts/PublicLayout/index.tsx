import React, { FC } from "react";
import { Box } from "@mui/material";

const PublicLayout: FC = ({children}) => {

  return (
    <Box
      height='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
      component="main"
      sx={{
        backgroundColor: (theme) => theme.palette.grey["300"]
      }}
    >
      {children}
    </Box>
  )
}

export default PublicLayout;
