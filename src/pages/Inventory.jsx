import React from 'react';
import { Box, Typography } from '@mui/material';

const Inventory = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Inventory
      </Typography>
      <Typography color="text.secondary">This is the Inventory page placeholder.</Typography>
    </Box>
  );
};

export default Inventory;
