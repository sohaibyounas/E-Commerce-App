import React from 'react';
import { Box, Typography } from '@mui/material';

const Profile = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Profile
      </Typography>
      <Typography color="text.secondary">This is the Profile page placeholder.</Typography>
    </Box>
  );
};

export default Profile;
