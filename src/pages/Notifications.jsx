import React from 'react';
import { Box, Typography } from '@mui/material';

const Notifications = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Notifications
      </Typography>
      <Typography color="text.secondary">This is the Notifications page placeholder.</Typography>
    </Box>
  );
};

export default Notifications;
