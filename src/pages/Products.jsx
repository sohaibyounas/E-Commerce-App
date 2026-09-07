import React from 'react';
import { Box, Typography } from '@mui/material';

const Products = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Products
      </Typography>
      <Typography color="text.secondary">This is the Products page placeholder.</Typography>
    </Box>
  );
};

export default Products;
