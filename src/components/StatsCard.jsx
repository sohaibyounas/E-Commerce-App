import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from '@mui/icons-material';

const StatsCard = ({ title, value, icon, trend, trendValue, color }) => {
  const isPositive = trend === 'up';

  return (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography variant="h4" color="text.primary" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ 
            bgcolor: `${color}20`, 
            color: color,
            width: 48, 
            height: 48 
          }}>
            {icon}
          </Avatar>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: isPositive ? 'success.main' : 'error.main',
            bgcolor: isPositive ? 'success.main' : 'error.main',
            mr: 1
          }}>
            {isPositive ? <TrendingUpIcon fontSize="small" color="success" /> : <TrendingDownIcon fontSize="small" color="error" />}
            <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 600, color: isPositive ? 'success.main' : 'error.main' }}>
              {trendValue}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            vs last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
